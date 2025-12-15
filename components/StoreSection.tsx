import React, { useState } from 'react';
import { ShoppingBag, Check, Star, Zap, Crown, Loader2 } from 'lucide-react';
import { STORE_ITEMS } from '../constants';
import { StoreItem, User } from '../types';

interface StoreSectionProps {
  user: User | null;
  onOpenAuth: () => void;
}

const StoreSection: React.FC<StoreSectionProps> = ({ user, onOpenAuth }) => {
  const [filter, setFilter] = useState<'all' | 'vip' | 'cash'>('all');

  const filteredItems = filter === 'all' 
    ? STORE_ITEMS 
    : STORE_ITEMS.filter(item => item.category === filter);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-950">
      <div className="container mx-auto px-4">
        
        {/* Store Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-brand-500/20 rounded-2xl mb-4">
            <ShoppingBag size={40} className="text-brand-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            LOJA <span className="text-accent-400">OFICIAL</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Adquira VIPs e Cash para se destacar no servidor. Todas as compras ajudam a manter o BrazinoMC online e sem lag.
          </p>
          
          {!user && (
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl inline-block">
              <p className="text-blue-200 text-sm font-bold">
                💡 Faça login para realizar compras e receber seus itens automaticamente.
              </p>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              filter === 'all' 
                ? 'bg-white text-slate-900' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('vip')}
            className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              filter === 'vip' 
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Crown size={18} /> VIPs
          </button>
          <button 
            onClick={() => setFilter('cash')}
            className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              filter === 'cash' 
                ? 'bg-accent-500 text-slate-900 shadow-lg shadow-accent-500/25' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Zap size={18} /> Cash
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <StoreCard 
              key={item.id} 
              item={item} 
              user={user} 
              onOpenAuth={onOpenAuth} 
            />
          ))}
        </div>

        {/* Security Badge */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Pagamento 100% Seguro via Mercado Pago e PIX
          </div>
        </div>
      </div>
    </div>
  );
};

const StoreCard: React.FC<{ item: StoreItem; user: User | null; onOpenAuth: () => void }> = ({ item, user, onOpenAuth }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleBuy = () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    setIsPurchasing(true);
    // Simulação de processo de compra
    setTimeout(() => {
      setIsPurchasing(false);
      alert(`Pedido criado para ${item.name}! Você será redirecionado para o pagamento.`);
    }, 1500);
  };

  return (
    <div className={`relative flex flex-col bg-slate-900 rounded-2xl overflow-hidden border transition-all hover:-translate-y-2 duration-300 ${
      item.bestValue 
        ? 'border-brand-500 shadow-xl shadow-brand-500/10' 
        : 'border-white/10 hover:border-brand-500/30'
    }`}>
      {item.bestValue && (
        <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          MAIS VENDIDO
        </div>
      )}

      <div className="p-8 flex flex-col items-center text-center border-b border-white/5 bg-gradient-to-b from-slate-800/50 to-slate-900">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
          item.category === 'vip' ? 'bg-brand-500/20' : 'bg-accent-500/20'
        }`}>
           {item.category === 'vip' ? <Crown size={40} className="text-brand-400" /> : <Zap size={40} className="text-accent-400" />}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
        <div className="text-3xl font-black text-white mb-1">
          R$ {item.price.toFixed(2).replace('.', ',')}
        </div>
      </div>

      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {item.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
              <Check size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
              <span className="text-left">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0">
        <button 
          onClick={handleBuy}
          disabled={isPurchasing}
          className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${
            item.bestValue 
              ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/25' 
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
          }`}
        >
          {isPurchasing ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Processando...
            </>
          ) : (
            "Comprar Agora"
          )}
        </button>
      </div>
    </div>
  );
};

export default StoreSection;