import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServerStats from './components/ServerStats';
import NewsSection from './components/NewsSection';
import FeatureGrid from './components/FeatureGrid';
import RulesSection from './components/RulesSection';
import DiscordSection from './components/DiscordSection';
import Footer from './components/Footer';
import StoreSection from './components/StoreSection';
import ClanSection from './components/ClanSection';
import AuthModal from './components/AuthModal';
import { SERVER_IP, MOCK_CLANS } from './constants';
import { User, Clan } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [copied, setCopied] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Clan State
  const [clans, setClans] = useState<Clan[]>(MOCK_CLANS);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home'); // Redirect to home on logout just in case
  };

  const handleNavigate = (pageId: string) => {
    // Pages that are separate "views"
    const standalonePages = ['store', 'clans'];

    if (standalonePages.includes(pageId)) {
      setCurrentPage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If we are on a standalone page and navigating elsewhere, go back to home view first
    if (standalonePages.includes(currentPage) && !standalonePages.includes(pageId)) {
      setCurrentPage('home');
      // Allow React to render Home first, then scroll
      setTimeout(() => {
        const element = document.getElementById(pageId === 'home' ? 'root' : pageId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 10);
      return;
    }
    
    // Normal scrolling navigation within Home
    const element = document.getElementById(pageId === 'home' ? 'root' : pageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage(pageId);
    }
  };

  // Clan Logic handlers
  const handleCreateClan = (name: string, tag: string, description: string) => {
    if (!user) return;
    
    const newClan: Clan = {
      id: Date.now().toString(),
      name,
      tag,
      description,
      level: 1,
      bank: 0,
      createdAt: new Date().toISOString(),
      members: [{
        username: user.username,
        role: 'Líder',
        joinedAt: new Date().toISOString()
      }],
      messages: []
    };

    setClans([...clans, newClan]);
    setUser({ ...user, clanId: newClan.id });
  };

  const handleJoinClan = (clanId: string) => {
    if (!user) return;

    setClans(clans.map(c => {
      if (c.id === clanId) {
        return {
          ...c,
          members: [...c.members, {
            username: user.username,
            role: 'Membro',
            joinedAt: new Date().toISOString()
          }]
        };
      }
      return c;
    }));
    setUser({ ...user, clanId: clanId });
  };

  const handleLeaveClan = () => {
    if (!user || !user.clanId) return;

    setClans(clans.map(c => {
      if (c.id === user.clanId) {
        return {
          ...c,
          members: c.members.filter(m => m.username !== user.username)
        };
      }
      return c;
    }));
    setUser({ ...user, clanId: undefined });
  };

  const handleSendClanMessage = (clanId: string, content: string) => {
    if (!user) return;
    
    const member = clans.find(c => c.id === clanId)?.members.find(m => m.username === user.username);
    if (!member) return;

    const newMessage = {
      id: Date.now().toString(),
      author: user.username,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rank: member.role
    };

    setClans(clans.map(c => {
      if (c.id === clanId) {
        return { ...c, messages: [...c.messages, newMessage] };
      }
      return c;
    }));
  };

  const handleDepositBank = (clanId: string, amount: number) => {
    if (!user || user.cash < amount) return;

    // Deduct from user
    setUser({ ...user, cash: user.cash - amount });

    // Add to clan
    setClans(clans.map(c => {
      if (c.id === clanId) {
        return { ...c, bank: c.bank + amount };
      }
      return c;
    }));
  };

  // Simple scroll spy (only active when not in Store or Clans mode)
  useEffect(() => {
    if (currentPage === 'store' || currentPage === 'clans') return;

    const handleScroll = () => {
      const sections = ['home', 'games', 'rules', 'discord'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setCurrentPage(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-brand-500/30">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {currentPage === 'store' ? (
        <StoreSection 
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      ) : currentPage === 'clans' ? (
        <ClanSection 
          user={user}
          clans={clans}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onCreateClan={handleCreateClan}
          onJoinClan={handleJoinClan}
          onLeaveClan={handleLeaveClan}
          onSendClanMessage={handleSendClanMessage}
          onDepositBank={handleDepositBank}
        />
      ) : (
        // Landing Page View
        <>
          <div id="home">
            <Hero onCopy={handleCopyIp} copied={copied} />
          </div>

          <ServerStats />

          <NewsSection />

          <div id="games">
            <FeatureGrid />
          </div>

          <RulesSection />

          <DiscordSection />
        </>
      )}

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;