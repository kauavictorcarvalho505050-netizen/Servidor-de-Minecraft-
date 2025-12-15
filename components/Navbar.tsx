import React, { useState, useEffect } from 'react';
import { Menu, X, Copy, Check, Gamepad2, ShoppingBag, Book, Users, Home, LogIn, LogOut, User as UserIcon, ChevronDown, Shield } from 'lucide-react';
import { SERVER_IP } from '../constants';
import { User } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, onOpenAuth, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: 'home', label: 'Início', icon: <Home size={18} /> },
    { id: 'games', label: 'Jogos', icon: <Gamepad2 size={18} /> },
    { id: 'store', label: 'Loja', icon: <ShoppingBag size={18} /> },
    { id: 'clans', label: 'Clãs', icon: <Shield size={18} /> },
    { id: 'rules', label: 'Regras', icon: <Book size={18} /> },
    { id: 'discord', label: 'Discord', icon: <Users size={18} /> },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-brand-500">BRAZINO<span className="text-accent-400">MC</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                currentPage === item.id ? 'text-brand-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Server IP Button */}
          <button 
            onClick={copyIp}
            className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-800 border border-white/10 px-4 py-2 rounded-lg font-bold text-sm transition-all"
          >
            <span className="text-accent-400 font-mono">{SERVER_IP}</span>
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-400" />}
          </button>

          {/* Auth Section */}
          <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:bg-white/5 px-2 py-1 rounded-lg transition-colors"
              >
                <div className="text-right hidden xl:block">
                  <div className="text-white text-sm font-bold">{user.username}</div>
                  <div className="text-brand-400 text-xs font-bold uppercase">{user.rank}</div>
                </div>
                <img 
                  src={`https://minotar.net/helm/${user.username}/100.png`} 
                  alt="Skin" 
                  className="w-10 h-10 rounded-lg border-2 border-brand-500 shadow-lg shadow-brand-500/20"
                />
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Saldo</p>
                    <div className="text-accent-400 font-mono font-bold flex items-center gap-1">
                      {user.cash.toLocaleString()} Cash
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-brand-600/20 transition-all flex items-center gap-2"
            >
              <LogIn size={18} />
              ENTRAR
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          {user && (
             <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-white/5">
                <img 
                  src={`https://minotar.net/helm/${user.username}/100.png`} 
                  alt="Skin" 
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <div className="text-white font-bold">{user.username}</div>
                  <div className="text-brand-400 text-xs">{user.rank} • {user.cash} Cash</div>
                </div>
             </div>
          )}

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                currentPage === item.id ? 'bg-brand-500/20 text-brand-400' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          
          <div className="h-[1px] bg-white/10 my-1"></div>

          {user ? (
            <button 
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-lg text-sm font-bold uppercase tracking-wide text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Sair da Conta
            </button>
          ) : (
            <button 
              onClick={() => {
                onOpenAuth();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-brand-600 text-white p-3 rounded-lg text-sm font-bold uppercase tracking-wide"
            >
              <LogIn size={18} />
              Fazer Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;