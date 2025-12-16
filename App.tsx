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
import AuthModal from './components/AuthModal';
import { SERVER_IP } from './constants';
import { User } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [copied, setCopied] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
    const standalonePages = ['store'];

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

  // Simple scroll spy (only active when not in Store mode)
  useEffect(() => {
    if (currentPage === 'store') return;

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