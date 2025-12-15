import React from 'react';
import { Play, Copy, Check } from 'lucide-react';
import { SERVER_IP } from '../constants';

interface HeroProps {
  onCopy: () => void;
  copied: boolean;
}

const Hero: React.FC<HeroProps> = ({ onCopy, copied }) => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/d0PQYczW/minecraft-pictures-rdkon718ct0tz0b4.jpg" 
          alt="Minecraft Background" 
          className="w-full h-full object-cover object-top"
          loading="eager"
          onError={(e) => {
            // Fallback para uma imagem segura caso a principal falhe
            e.currentTarget.src = "https://www.minecraft.net/content/dam/games/minecraft/key-art/Minecraft-1-19-Key-Art.jpg";
          }}
        />
        {/* Gradient Overlay - Fully transparent at top (from-transparent) to show the art clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center mt-20">
        <div className="inline-block mb-4 px-4 py-1 bg-brand-500/20 border border-brand-500/50 rounded-full backdrop-blur-md">
          <span className="text-brand-300 font-bold text-sm tracking-wider uppercase">Temporada Brasileira Já Disponível</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
          A SUA JORNADA COMEÇA NO <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-yellow-400 to-brand-500 drop-shadow-sm">BRAZINOMC</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg font-medium">
          O servidor feito para o Brasil. Junte-se a milhares de jogadores no melhor PvP, BedWars e Survival com ping BR.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-600/30 transition-all flex items-center gap-3 group border border-brand-500">
            <Play size={24} fill="currentColor" className="group-hover:scale-110 transition-transform" />
            JOGAR AGORA
          </button>

          <div 
            onClick={onCopy}
            className="cursor-pointer bg-slate-900/60 hover:bg-slate-900/80 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 transition-all flex items-center gap-3 backdrop-blur-md"
          >
            <span className="font-mono text-accent-400 drop-shadow-md">{SERVER_IP}</span>
            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="text-slate-400" />}
          </div>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-slate-300 font-semibold text-sm uppercase tracking-widest drop-shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            Online 24/7
          </div>
          <span>•</span>
          <div>Ping BR</div>
          <span>•</span>
          <div>Versão 1.8 - 1.20+</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;