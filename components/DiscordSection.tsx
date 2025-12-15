import React from 'react';
import { Users, MessageCircle } from 'lucide-react';
import { DISCORD_LINK } from '../constants';

const DiscordSection: React.FC = () => {
  return (
    <section id="discord" className="py-24 bg-gradient-to-b from-slate-950 to-brand-950/30 relative">
      <div className="container mx-auto px-4">
        <div className="bg-[#5865F2] rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-[#5865F2]/20 group">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://assets-global.website-files.com/6257adef93867e56f84d3092/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png')] bg-center bg-no-repeat bg-cover mix-blend-overlay pointer-events-none transition-transform duration-700 group-hover:scale-105"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                FAÇA PARTE DA COMUNIDADE
              </h2>
              <p className="text-white/90 text-lg mb-8 font-medium">
                Entre em nosso Discord para participar de sorteios, encontrar amigos para jogar, reportar bugs e ficar por dentro de todas as novidades em primeira mão.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg text-white/80 text-sm font-bold">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  4,230 Online
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg text-white/80 text-sm font-bold">
                  <Users size={14} />
                  15,000+ Membros
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a 
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#5865F2] px-8 py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
              >
                <MessageCircle size={24} />
                ENTRAR NO DISCORD
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscordSection;