import React from 'react';

const ServerStats: React.FC = () => {
  return (
    <section className="py-10 -mt-10 relative z-20">
      <div className="container mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Jogadores Online</h3>
              <div className="text-4xl font-black text-white flex items-center gap-3">
                200
                <span className="text-sm font-bold text-brand-400 bg-brand-400/10 px-2 py-1 rounded-md border border-brand-400/20">
                  +15% vs ontem
                </span>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-slate-400 text-sm">Recorde BR: <span className="text-accent-400 font-bold">5,200</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStats;