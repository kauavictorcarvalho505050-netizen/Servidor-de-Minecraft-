import React from 'react';
import { FEATURES } from '../constants';
import { Sword } from 'lucide-react';

const IconMap: Record<string, React.ReactNode> = {
  'sword': <Sword size={32} />,
};

const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">MODOS DE JOGO</h2>
          <div className="w-20 h-2 bg-gradient-to-r from-brand-600 to-accent-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Escolha sua aventura. Temos modos para todos os estilos de jogadores.
          </p>
        </div>

        {/* Changed from Grid to Flex to center the remaining items effectively */}
        <div className="flex flex-wrap justify-center gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/50 transition-all hover:-translate-y-2 w-full md:max-w-md flex-1 min-w-[300px]"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-8 right-6 w-16 h-16 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg text-white border-4 border-slate-900 group-hover:bg-accent-500 transition-colors">
                  {IconMap[feature.icon] || <Sword size={32} />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;