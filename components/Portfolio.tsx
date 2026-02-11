
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Target, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../constants';

interface PortfolioProps {
  onBack?: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredItems = activeCategory === "All Projects" 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-12">
        {onBack && (
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group mb-12"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase">Back to Hub</span>
          </motion.button>
        )}

        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>Case Study Archive</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold font-heading mb-6"
          >
            The <span className="text-purple-500">Proof</span> Chamber
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Data-backed performance across high-ticket niches. We don't just create content; we engineer attention arbitrage.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === category 
                  ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.client}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative h-[480px] rounded-[48px] overflow-hidden glass border border-white/10 shadow-2xl"
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.image} 
                    alt={item.client} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-tighter px-2.5 py-1 bg-purple-600/90 text-white rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl font-bold font-heading text-white mb-2">{item.client}</h3>
                  <p className="text-slate-400 text-[10px] mb-8 uppercase tracking-[0.2em] font-black">{item.category}</p>

                  {/* Metrics Box */}
                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    <div className="text-center">
                      <div className="text-purple-400 font-black text-xl">{item.metrics.views}</div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-black text-xl">{item.metrics.followers}</div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-black text-xl">{item.metrics.conversion}</div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">ROI</div>
                    </div>
                  </div>
                </div>

                {/* Hover Reveal CTA */}
                <div className="absolute inset-0 bg-slate-950/95 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center justify-center p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                    <TrendingUp className="w-8 h-8 text-purple-400 animate-pulse" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 font-heading">Performance Deep-Dive</h4>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Access the complete strategic documentation for how we scaled {item.client}.
                  </p>
                  <button className="flex items-center space-x-3 px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold text-sm hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40">
                    <span>Unlock Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
