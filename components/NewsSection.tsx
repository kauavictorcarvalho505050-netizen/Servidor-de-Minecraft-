import React, { useEffect, useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { generateServerNews } from '../services/geminiService';
import { LoadingState } from '../types';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<string>("");
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  useEffect(() => {
    const fetchNews = async () => {
      setStatus(LoadingState.LOADING);
      const content = await generateServerNews();
      setNews(content);
      setStatus(LoadingState.SUCCESS);
    };

    fetchNews();
  }, []);

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="text-accent-400" size={28} />
          <h2 className="text-3xl font-black text-white">Últimas do BrazinoMC</h2>
        </div>

        <div className="bg-gradient-to-br from-brand-900/30 to-slate-800/50 border border-brand-500/20 rounded-2xl p-8 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">Novidade</span>
               <div className="flex items-center text-slate-400 text-sm gap-1">
                 <Calendar size={14} />
                 <span>Hoje</span>
               </div>
            </div>

            {status === LoadingState.LOADING ? (
               <div className="animate-pulse space-y-3">
                 <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                 <div className="h-4 bg-slate-700 rounded w-full"></div>
                 <div className="h-4 bg-slate-700 rounded w-5/6"></div>
               </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-line">
                  {news}
                </p>
              </div>
            )}

            <div className="mt-6">
               <button className="text-accent-400 font-bold text-sm hover:text-accent-300 transition-colors flex items-center gap-1">
                 Ler mais notícias <span className="text-xl">&rarr;</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;