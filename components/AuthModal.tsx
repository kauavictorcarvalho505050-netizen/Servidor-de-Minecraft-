import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de chamada de API
    setTimeout(() => {
      const mockUser: UserType = {
        username: username || 'Jogador',
        email: email || 'jogador@email.com',
        cash: mode === 'register' ? 0 : 1500, // Simula um usuário antigo com cash
        rank: 'Membro'
      };
      
      onLogin(mockUser);
      setIsLoading(false);
      onClose();
      
      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">
              {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="text-slate-400 text-sm">
              {mode === 'login' 
                ? 'Acesse sua conta para gerenciar suas compras.' 
                : 'Registre-se para comprar VIPs e receber novidades.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-800 p-1 rounded-lg mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                mode === 'login' 
                  ? 'bg-slate-700 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                mode === 'register' 
                  ? 'bg-slate-700 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nick do Minecraft</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Steve"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Email Field (Only for Register or strictly needed) */}
            {(mode === 'register' || mode === 'login') && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="email" 
                    required={mode === 'register'}
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-600/20"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : mode === 'login' ? (
                <>
                  <LogIn size={20} /> Entrar
                </>
              ) : (
                <>
                  <UserPlus size={20} /> Criar Conta
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-slate-950 p-4 text-center border-t border-white/5">
          <p className="text-slate-500 text-xs">
            Ao continuar, você concorda com nossos <a href="#" className="text-brand-400 hover:underline">Termos de Uso</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;