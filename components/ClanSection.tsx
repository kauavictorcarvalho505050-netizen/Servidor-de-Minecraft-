import React, { useState } from 'react';
import { Shield, Users, Trophy, Coins, MessageSquare, Plus, LogOut, Send, Search, Lock, AlertCircle } from 'lucide-react';
import { Clan, User, ClanRole, ClanMessage } from '../types';

interface ClanSectionProps {
  user: User | null;
  clans: Clan[];
  onOpenAuth: () => void;
  onCreateClan: (name: string, tag: string, description: string) => void;
  onJoinClan: (clanId: string) => void;
  onLeaveClan: () => void;
  onSendClanMessage: (clanId: string, content: string) => void;
  onDepositBank: (clanId: string, amount: number) => void;
}

const ClanSection: React.FC<ClanSectionProps> = ({ 
  user, 
  clans, 
  onOpenAuth, 
  onCreateClan, 
  onJoinClan,
  onLeaveClan,
  onSendClanMessage,
  onDepositBank
}) => {
  // If user is not logged in
  if (!user) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <Shield size={64} className="text-brand-500 mx-auto mb-6 opacity-50" />
          <h1 className="text-3xl font-black text-white mb-4">Sistema de Clãs</h1>
          <p className="text-slate-400 mb-8">
            Faça login para criar seu próprio clã ou juntar-se a uma guilda existente. 
            Participe de guerras, compartilhe recursos e domine o servidor.
          </p>
          <button 
            onClick={onOpenAuth}
            className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-brand-600/20"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  const userClan = user.clanId ? clans.find(c => c.id === user.clanId) : null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-950">
      <div className="container mx-auto px-4">
        {userClan ? (
          <ClanDashboard 
            user={user} 
            clan={userClan} 
            onLeave={onLeaveClan}
            onSendMessage={(content) => onSendClanMessage(userClan.id, content)}
            onDeposit={(amount) => onDepositBank(userClan.id, amount)}
          />
        ) : (
          <ClanBrowser 
            clans={clans} 
            onCreate={onCreateClan} 
            onJoin={onJoinClan} 
          />
        )}
      </div>
    </div>
  );
};

// --- Sub Components ---

const ClanBrowser: React.FC<{
  clans: Clan[], 
  onCreate: (n: string, t: string, d: string) => void,
  onJoin: (id: string) => void
}> = ({ clans, onCreate, onJoin }) => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [newName, setNewName] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(newName, newTag, newDesc);
  };

  const filteredClans = clans.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white mb-4">CLÃS E GUILDAS</h1>
        <p className="text-slate-400">Junte-se a uma aliança poderosa ou comece sua própria dinastia.</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex gap-4 mb-8 bg-slate-900/50 p-2 rounded-xl backdrop-blur-sm border border-white/5 w-fit mx-auto">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              activeTab === 'list' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search size={18} /> Procurar Clã
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              activeTab === 'create' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus size={18} /> Criar Novo
          </button>
        </div>

        {activeTab === 'list' ? (
          <div className="space-y-4">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nome ou tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-500 outline-none"
              />
            </div>

            <div className="grid gap-4">
              {filteredClans.map(clan => (
                <div key={clan.id} className="bg-slate-900 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl flex items-center justify-center font-black text-xl text-slate-300 border border-white/10">
                      {clan.tag}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white">{clan.name}</h3>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold border border-white/5">Lvl {clan.level}</span>
                      </div>
                      <p className="text-slate-400 text-sm max-w-md">{clan.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase font-bold">Membros</div>
                      <div className="text-white font-bold">{clan.members.length}/20</div>
                    </div>
                    <button 
                      onClick={() => onJoin(clan.id)}
                      className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-lg font-bold transition-all"
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredClans.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  Nenhum clã encontrado com esse nome.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Fundar um novo Clã</h2>
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2 uppercase">Nome do Clã</label>
                <input 
                  type="text" 
                  required
                  maxLength={20}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                  placeholder="Ex: Guerreiros da Luz"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2 uppercase">Tag do Clã (3-4 letras)</label>
                <input 
                  type="text" 
                  required
                  maxLength={4}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-brand-500 outline-none uppercase font-mono"
                  placeholder="Ex: WAR"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-bold mb-2 uppercase">Descrição</label>
                <textarea 
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-brand-500 outline-none resize-none"
                  placeholder="Qual o objetivo do seu clã?"
                />
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-sm text-yellow-500 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Custo: Grátis (VIP) / 50k Coins
                </div>
                <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
                  Criar Clã
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const ClanDashboard: React.FC<{ 
  user: User, 
  clan: Clan, 
  onLeave: () => void,
  onSendMessage: (msg: string) => void,
  onDeposit: (amt: number) => void
}> = ({ user, clan, onLeave, onSendMessage, onDeposit }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'chat' | 'bank'>('overview');
  const [chatInput, setChatInput] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const chatRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [clan.messages, activeTab]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput('');
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(depositAmount);
    if (amount > 0 && amount <= user.cash) {
      onDeposit(amount);
      setDepositAmount('');
    } else {
      alert("Saldo insuficiente ou valor inválido.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Clan Header */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Shield size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-brand-500/20 border-2 border-brand-400">
              {clan.tag}
            </div>
            <div>
               <h1 className="text-4xl font-black text-white mb-2">{clan.name}</h1>
               <p className="text-slate-400 max-w-xl">{clan.description}</p>
               <div className="flex gap-4 mt-4">
                 <div className="bg-slate-800/50 px-3 py-1 rounded text-sm text-slate-300 font-mono border border-white/5">
                    Nível {clan.level}
                 </div>
                 <div className="bg-slate-800/50 px-3 py-1 rounded text-sm text-slate-300 font-mono border border-white/5">
                    ID: #{clan.id}
                 </div>
               </div>
            </div>
          </div>
          
          <button 
            onClick={onLeave}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors text-sm font-bold"
          >
            <LogOut size={16} /> Sair do Clã
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left p-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'overview' ? 'bg-slate-800 text-white border border-brand-500/50' : 'bg-transparent text-slate-400 hover:bg-slate-800/50'}`}
          >
            <Trophy size={20} className={activeTab === 'overview' ? 'text-brand-400' : ''} /> Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`w-full text-left p-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'chat' ? 'bg-slate-800 text-white border border-brand-500/50' : 'bg-transparent text-slate-400 hover:bg-slate-800/50'}`}
          >
            <MessageSquare size={20} className={activeTab === 'chat' ? 'text-brand-400' : ''} /> Chat do Clã
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`w-full text-left p-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'members' ? 'bg-slate-800 text-white border border-brand-500/50' : 'bg-transparent text-slate-400 hover:bg-slate-800/50'}`}
          >
            <Users size={20} className={activeTab === 'members' ? 'text-brand-400' : ''} /> Membros
          </button>
          <button 
            onClick={() => setActiveTab('bank')}
            className={`w-full text-left p-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeTab === 'bank' ? 'bg-slate-800 text-white border border-brand-500/50' : 'bg-transparent text-slate-400 hover:bg-slate-800/50'}`}
          >
            <Coins size={20} className={activeTab === 'bank' ? 'text-brand-400' : ''} /> Banco
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Trophy size={18} className="text-yellow-500" /> Estatísticas</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                       <span className="text-slate-400">Guerras Vencidas</span>
                       <span className="text-white font-mono font-bold">42</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                       <span className="text-slate-400">KDR Médio</span>
                       <span className="text-white font-mono font-bold">3.5</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                       <span className="text-slate-400">Fundação</span>
                       <span className="text-white font-mono font-bold">{new Date(clan.createdAt).toLocaleDateString()}</span>
                    </div>
                 </div>
               </div>
               
               <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Coins size={18} className="text-yellow-500" /> Tesouro</h3>
                 <div className="text-3xl font-black text-yellow-400 mb-2">
                    {clan.bank.toLocaleString()} <span className="text-sm text-slate-400 font-normal">Coins</span>
                 </div>
                 <p className="text-slate-500 text-sm mb-4">Recursos usados para upgrades de nível e buffs de clã.</p>
                 <button onClick={() => setActiveTab('bank')} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                    Contribuir
                 </button>
               </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
               <div className="p-4 bg-slate-800/50 border-b border-white/5 grid grid-cols-12 gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                 <div className="col-span-6">Jogador</div>
                 <div className="col-span-3">Cargo</div>
                 <div className="col-span-3 text-right">Entrou em</div>
               </div>
               <div className="divide-y divide-white/5">
                 {clan.members.map((member, idx) => (
                   <div key={idx} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors">
                     <div className="col-span-6 flex items-center gap-3">
                        <img src={`https://minotar.net/helm/${member.username}/32.png`} className="w-8 h-8 rounded" alt="" />
                        <span className={`font-bold ${member.username === user.username ? 'text-brand-400' : 'text-white'}`}>{member.username}</span>
                     </div>
                     <div className="col-span-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          member.role === 'Líder' ? 'bg-red-500/20 text-red-400' : 
                          member.role === 'Oficial' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-slate-700 text-slate-300'
                        }`}>
                          {member.role}
                        </span>
                     </div>
                     <div className="col-span-3 text-right text-slate-500 text-sm font-mono">
                       {new Date(member.joinedAt).toLocaleDateString()}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'chat' && (
             <div className="bg-slate-900 border border-white/5 rounded-2xl flex flex-col h-[500px]">
                <div className="p-4 border-b border-white/5 bg-slate-800/30">
                   <h3 className="font-bold text-white">Chat da Guilda</h3>
                </div>
                <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                   {clan.messages.length === 0 ? (
                      <div className="text-center text-slate-600 my-10 italic">Nenhuma mensagem ainda. Diga olá!</div>
                   ) : (
                     clan.messages.map((msg) => (
                       <div key={msg.id} className="flex items-start gap-3">
                          <img src={`https://minotar.net/helm/${msg.author}/32.png`} className="w-8 h-8 rounded mt-1" alt="" />
                          <div>
                             <div className="flex items-baseline gap-2">
                                <span className={`font-bold text-sm ${
                                   msg.rank === 'Líder' ? 'text-red-400' : 
                                   msg.rank === 'Oficial' ? 'text-blue-400' : 'text-slate-300'
                                }`}>{msg.author}</span>
                                <span className="text-[10px] text-slate-600">{msg.timestamp}</span>
                             </div>
                             <p className="text-slate-300 text-sm">{msg.content}</p>
                          </div>
                       </div>
                     ))
                   )}
                </div>
                <div className="p-4 border-t border-white/5 bg-slate-800/30">
                   <form onSubmit={handleSendChat} className="flex gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-brand-500 outline-none"
                      />
                      <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-lg transition-colors">
                         <Send size={20} />
                      </button>
                   </form>
                </div>
             </div>
          )}

          {activeTab === 'bank' && (
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 text-center">
               <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coins size={40} className="text-yellow-500" />
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">Banco do Clã</h2>
               <div className="text-4xl font-black text-yellow-400 mb-8 tracking-tight">
                  {clan.bank.toLocaleString()} <span className="text-xl text-slate-400">Coins</span>
               </div>

               <div className="max-w-md mx-auto bg-slate-800/50 p-6 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-4 text-left">Fazer Depósito</h4>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                     <span>Seu saldo:</span>
                     <span className="text-accent-400 font-bold">{user.cash.toLocaleString()} Cash</span>
                  </div>
                  <form onSubmit={handleDeposit} className="space-y-4">
                     <div className="relative">
                        <Coins className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                           type="number" 
                           min="1"
                           max={user.cash}
                           value={depositAmount}
                           onChange={(e) => setDepositAmount(e.target.value)}
                           className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-500 outline-none"
                           placeholder="Quantidade"
                        />
                     </div>
                     <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-yellow-600/20">
                        Depositar
                     </button>
                  </form>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClanSection;