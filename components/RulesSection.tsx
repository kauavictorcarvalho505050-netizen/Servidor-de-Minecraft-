import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { SERVER_RULES } from '../constants';

const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-20 w-64 h-64 bg-brand-900/20 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4 text-brand-400">
            <Shield size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">REGRAS DO SERVIDOR</h2>
          <p className="text-slate-400 max-w-2xl">
            Para manter a comunidade saudável e divertida para todos, seguimos algumas diretrizes fundamentais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SERVER_RULES.map((rule) => (
            <div 
              key={rule.id}
              className="bg-slate-800/50 border border-white/5 hover:border-brand-500/30 rounded-xl p-6 transition-all hover:bg-slate-800 group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 text-brand-500 group-hover:text-brand-400 transition-colors">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{rule.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {rule.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Ao jogar no MineVerse, você concorda automaticamente com todos os termos acima.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;