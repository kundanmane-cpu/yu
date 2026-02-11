
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onInquiryClick: () => void;
  onPortfolioClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onInquiryClick, onPortfolioClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Services', 
      href: '#services',
      subLinks: [
        { name: 'Instagram Growth', href: '#services' },
        { name: 'Reels Editing', href: '#services' },
        { name: 'Content Strategy', href: '#services' }
      ]
    },
    { 
      name: 'Portfolio', 
      action: onPortfolioClick,
      subLinks: [
        { name: 'Case Studies', action: onPortfolioClick },
        { name: 'Client Metrics', action: onPortfolioClick },
        { name: 'Creative Proof', action: onPortfolioClick }
      ]
    },
    { 
      name: 'Strategy', 
      href: '#methodology',
      subLinks: [
        { name: 'Our Methodology', href: '#methodology' },
        { name: 'Growth Trajectory', href: '#trajectory' },
        { name: 'Process', href: '#process' }
      ]
    },
    { 
      name: 'About', 
      href: '#about',
      subLinks: [
        { name: 'Our Vision', href: '#about' },
        { name: 'Results', href: '#results' },
        { name: 'FAQ', href: '#faq' }
      ]
    }
  ];

  const brandText = "ThriveX";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 group"
        >
          <a href="#home" className="flex items-center" onClick={(e) => {
            // Prevent default if we are on landing already, or handle as needed
          }}>
            <span className="text-xl md:text-2xl font-bold font-heading tracking-tighter text-white flex items-center">
              {brandText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    color: char === 'X' ? ['#a855f7', '#d946ef', '#a855f7'] : ['#ffffff', '#e2e8f0', '#ffffff'],
                    textShadow: char === 'X' ? ['0 0 0px #a855f7', '0 0 10px #a855f7', '0 0 0px #a855f7'] : 'none'
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative py-2"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button
                onClick={link.action || (() => {
                  if (link.href) {
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                })}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center space-x-1 group outline-none"
              >
                <span>{link.name}</span>
                {link.subLinks && (
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${hoveredLink === link.name ? 'rotate-180 text-purple-400' : ''}`} />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </button>

              <AnimatePresence>
                {hoveredLink === link.name && link.subLinks && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-48 glass rounded-2xl p-2 mt-2 shadow-2xl border border-white/10 z-[60]"
                  >
                    <div className="flex flex-col space-y-1">
                      {link.subLinks.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => {
                            if (sub.action) sub.action();
                            else if (sub.href) {
                              const el = document.querySelector(sub.href);
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }
                            setHoveredLink(null);
                          }}
                          className="text-xs py-2 px-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group/sub text-left outline-none"
                        >
                          {sub.name}
                          <span>→</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <motion.button
            onClick={onInquiryClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/20 animate-pulse-glow"
          >
            Send Inquiry
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 w-full h-screen bg-slate-950 p-6 md:hidden flex flex-col z-[100]"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-bold font-heading text-white">THRIVE<span className="text-purple-500">X</span></span>
              <button onClick={() => setMobileOpen(false)} className="text-white p-2"><X /></button>
            </div>

            <div className="flex flex-col space-y-6 overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/5 pb-4">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                    className="w-full text-left text-2xl font-bold flex justify-between items-center text-slate-100 outline-none"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-6 h-6 transition-transform ${mobileExpanded === link.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {mobileExpanded === link.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col space-y-4 pt-4 pl-4"
                      >
                        {link.subLinks?.map((sub) => (
                          <button
                            key={sub.name}
                            onClick={() => {
                              if (sub.action) sub.action();
                              else if (sub.href) {
                                const el = document.querySelector(sub.href);
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }
                              setMobileOpen(false);
                            }}
                            className="text-lg text-slate-400 text-left outline-none"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <motion.button
                onClick={() => {
                  onInquiryClick();
                  setMobileOpen(false);
                }}
                className="w-full text-center py-5 rounded-2xl bg-purple-600 text-white font-bold text-xl shadow-2xl shadow-purple-500/30"
              >
                Send Inquiry
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
