import React from 'react';
import { STORE_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-white font-bold text-lg">BRAZINO<span className="text-accent-400">MC</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              O maior servidor de Minecraft do Brasil. Focado em diversão, comunidade e competição.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Início</a></li>
              <li><a href="#games" className="hover:text-brand-400 transition-colors">Jogos</a></li>
              <li><a href={STORE_LINK} className="hover:text-brand-400 transition-colors">Loja Oficial</a></li>
              <li><a href="#rules" className="hover:text-brand-400 transition-colors">Regras</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Ban Appeal</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Denúncias</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Loja</h4>
            <p className="text-slate-500 text-sm mb-4">
              Adquira VIPs, Cash e itens exclusivos para ajudar a manter o servidor online.
            </p>
            <a 
              href={STORE_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              Acessar Loja
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} BrazinoMC Servidores. Não afiliado à Mojang Studios.
          </p>
          <div className="flex gap-4">
            {/* Social Icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;