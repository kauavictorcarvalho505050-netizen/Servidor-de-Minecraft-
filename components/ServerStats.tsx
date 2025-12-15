import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlayerStats } from '../types';

const generateMockData = (): PlayerStats[] => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      players: Math.floor(Math.random() * (3000 - 1000) + 1000)
    });
  }
  return data;
};

const data = generateMockData();

const ServerStats: React.FC = () => {
  return (
    <section className="py-10 -mt-10 relative z-20">
      <div className="container mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
            <div>
              <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Jogadores Online</h3>
              <div className="text-4xl font-black text-white flex items-center gap-3">
                2,148
                <span className="text-sm font-bold text-brand-400 bg-brand-400/10 px-2 py-1 rounded-md border border-brand-400/20">
                  +15% vs ontem
                </span>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-slate-400 text-sm">Recorde BR: <span className="text-accent-400 font-bold">5,200</span></div>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                  itemStyle={{ color: '#4ade80' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="players" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorPlayers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStats;