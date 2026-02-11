
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Results from './components/Results';
import Methodology from './components/Methodology';
import GrowthTrajectory from './components/GrowthTrajectory';
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import InquiryPage from './components/InquiryPage';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [view, setView] = useState<'landing' | 'inquiry' | 'portfolio'>('landing');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (view === 'landing') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, { threshold: 0.2 });

      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });

      return () => observer.disconnect();
    }
  }, [view]);

  const navigateToInquiry = (planName?: string) => {
    setSelectedPlan(planName || null);
    setView('inquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortfolio = () => {
    setView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative font-['Inter']">
      {/* Global Futuristic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full"></div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar 
              activeSection={activeSection} 
              onInquiryClick={() => navigateToInquiry()} 
              onPortfolioClick={navigateToPortfolio}
            />
            <main>
              <section id="home">
                <Hero onInquiryClick={() => navigateToInquiry()} />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="methodology">
                <Methodology />
              </section>
              <section id="process">
                <Process />
              </section>
              <section id="trajectory">
                <GrowthTrajectory />
              </section>
              <section id="results">
                <Results />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="faq">
                <FAQ />
              </section>
            </main>
            <Footer />
          </motion.div>
        ) : view === 'portfolio' ? (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Portfolio onBack={navigateToLanding} />
          </motion.div>
        ) : (
          <motion.div
            key="inquiry"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            <InquiryPage 
              onBack={navigateToLanding} 
              initialPlan={selectedPlan} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
