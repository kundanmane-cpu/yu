import React from 'react';
import { motion } from 'framer-motion';
import { METHODOLOGY_STEPS } from '../constants';

const Methodology: React.FC = () => {
  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden" id="methodology">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Our Blueprint
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-6"
          >
            The Thrive<span className="text-purple-500">X</span> Methodology
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            We don't post and pray. We deploy a data-driven content stack designed for the attention economy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {METHODOLOGY_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: 'spring', damping: 15 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-[40px] pointer-events-none -z-10" />
              <div className="glass p-10 rounded-[40px] border border-white/5 h-full flex flex-col items-start transition-all duration-300 group-hover:border-purple-500/30 group-hover:bg-white/5 overflow-hidden">
                <div className={`mb-8 p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg relative z-10`}>
                  {/* Fixed TypeScript error by casting to React.ReactElement<any> to permit className property on cloneElement */}
                  {React.cloneElement(step.icon as React.ReactElement<any>, { className: 'w-8 h-8 text-white' })}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 font-heading text-white relative z-10">
                  {step.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-base relative z-10 group-hover:text-slate-300 transition-colors">
                  {step.desc}
                </p>

                {/* Decorative Number */}
                <div className="absolute -bottom-10 -right-10 text-[180px] font-black text-white/5 font-heading pointer-events-none select-none">
                  0{idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Methodology;