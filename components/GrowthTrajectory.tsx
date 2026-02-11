
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, TrendingUp, Calendar, Info, Activity } from 'lucide-react';

const GrowthTrajectory: React.FC = () => {
  const [currentReach, setCurrentReach] = useState(25000);
  const [postsPerWeek, setPostsPerWeek] = useState(3);
  
  // Logic: Calculate 12 months of growth based on Reach and Frequency
  const data = useMemo(() => {
    const months = Array.from({ length: 13 }, (_, i) => i);
    
    // Growth logic influenced by posting frequency
    // ThriveX: High retention compounding (base 12% + 4% per extra post)
    const thriveXMonthlyRate = 1.12 + (postsPerWeek * 0.04);
    // Baseline: Industry standard (base 2% + 1% per extra post)
    const baselineMonthlyRate = 1.02 + (postsPerWeek * 0.01);

    const baseline = months.map(m => currentReach * Math.pow(baselineMonthlyRate, m));
    const thrivex = months.map(m => currentReach * Math.pow(thriveXMonthlyRate, m));
    
    // Add 15% headroom to the max for visual padding at the top of the chart
    const maxVal = thrivex[12] * 1.15;
    
    return { months, baseline, thrivex, maxVal };
  }, [currentReach, postsPerWeek]);

  const finalThriveX = Math.floor(data.thrivex[12]);
  const finalBaseline = Math.floor(data.baseline[12]);
  const growthMultiple = (finalThriveX / finalBaseline).toFixed(1);
  const projectedLeads = Math.floor(finalThriveX * 0.02);

  // Helper to get SVG coordinates
  const getX = (m: number) => (m / 12) * 100;
  const getY = (v: number) => 100 - (v / data.maxVal) * 100;

  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden" id="trajectory">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-purple-600/5 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          
          {/* Left Column: Controls & Context */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Activity className="w-3 h-3 animate-pulse" />
                <span>Neural Growth Engine v2.4</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-heading leading-none mb-6">
                Visualize Your <span className="text-purple-500">Trajectory</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Adjust the variables to see how our proprietary <span className="text-white">High-Retention System</span> impacts your monthly reach.
              </p>
            </motion.div>

            <div className="glass p-8 rounded-[40px] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-12 h-12 text-purple-500" />
              </div>
              
              {/* Variable 1: Initial Reach */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      Initial Reach <Info className="w-3 h-3" />
                    </label>
                    <div className="text-3xl font-black text-white font-heading tracking-tighter">
                      {currentReach.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Multiplier</div>
                    <div className="text-xl font-black text-purple-400">{growthMultiple}x</div>
                  </div>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" 
                    min="5000" 
                    max="500000" 
                    step="5000"
                    value={currentReach} 
                    onChange={(e) => setCurrentReach(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 transition-all hover:accent-purple-400"
                  />
                  <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                    <span>Micro</span>
                    <span>Macro Creator</span>
                  </div>
                </div>
              </div>

              {/* Variable 2: Posts Per Week */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Posts Per Week</label>
                    <div className="text-3xl font-black text-white font-heading tracking-tighter flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <span>{postsPerWeek}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Velocity</div>
                    <div className="text-xl font-black text-blue-400">High</div>
                  </div>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="7" 
                    step="1"
                    value={postsPerWeek} 
                    onChange={(e) => setPostsPerWeek(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:accent-blue-400"
                  />
                  <div className="flex justify-between mt-3 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                    <span>Passive</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-3xl bg-white/5 border border-white/5 group hover:border-purple-500/20 transition-all">
                  <div className="text-[9px] text-slate-500 uppercase font-black mb-1">Year 1 Reach</div>
                  <div className="text-xl font-bold text-white font-heading">
                    {finalThriveX >= 1000000 ? `${(finalThriveX/1000000).toFixed(1)}M` : finalThriveX.toLocaleString()}
                  </div>
                </div>
                <div className="p-5 rounded-3xl bg-purple-500/5 border border-purple-500/20 group hover:bg-purple-500/10 transition-all">
                  <div className="text-[9px] text-purple-400 uppercase font-black mb-1">Monthly Leads</div>
                  <div className="text-xl font-bold text-purple-400 font-heading">
                    ~{projectedLeads.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Neural Chart */}
          <div className="lg:w-2/3 w-full flex flex-col">
            <div className="glass flex-grow rounded-[48px] border border-white/10 p-8 md:p-12 relative overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.5)]">
              
              {/* Legend & Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-20">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Standard</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]"></div>
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">ThriveX Systems</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Proprietary AI Forecast</span>
                </div>
              </div>

              {/* Chart Grid Area */}
              <div className="flex-grow relative mt-4 min-h-[300px]">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-slate-800"></div>
                  ))}
                </div>

                {/* Vertical Month Labels */}
                <div className="absolute bottom-[-40px] inset-x-0 flex justify-between px-1 text-[9px] font-black text-slate-600 uppercase tracking-tighter">
                  {['Start', '3M', '6M', '9M', '12M'].map((m, i) => <span key={i} className="w-8 text-center">{m}</span>)}
                </div>

                {/* The Chart SVG */}
                <svg 
                  className="w-full h-full relative z-10 overflow-visible" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(168,85,247,0.4)" />
                      <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                    </linearGradient>
                    <filter id="neonGlow">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Baseline Path */}
                  <motion.path
                    d={`M 0,${getY(data.baseline[0])} ${data.baseline.map((v, i) => `L ${getX(i)},${getY(v)}`).join(' ')}`}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="0.75"
                    strokeDasharray="3,3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />

                  {/* ThriveX Area Fill */}
                  <motion.path
                    d={`M 0,100 L 0,${getY(data.thrivex[0])} ${data.thrivex.map((v, i) => `L ${getX(i)},${getY(v)}`).join(' ')} L 100,100 Z`}
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />

                  {/* ThriveX Main Path */}
                  <motion.path
                    key={`path-${currentReach}-${postsPerWeek}`}
                    d={`M 0,${getY(data.thrivex[0])} ${data.thrivex.map((v, i) => `L ${getX(i)},${getY(v)}`).join(' ')}`}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neonGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Subtle Monthly Nodes */}
                  {data.thrivex.map((v, i) => (
                    i % 3 === 0 && (
                      <motion.circle
                        key={`node-${i}`}
                        cx={getX(i)}
                        cy={getY(v)}
                        r="1.5"
                        fill="#fff"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1 + (i * 0.05) }}
                      />
                    )
                  ))}

                  {/* Dynamic Pointer Dot */}
                  <motion.circle
                    cx="100"
                    cy={getY(data.thrivex[12])}
                    r="4.5"
                    fill="#fff"
                    stroke="#a855f7"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ filter: 'drop-shadow(0 0 10px #a855f7)' }}
                  />
                  <motion.circle
                    cx="100"
                    cy={getY(data.thrivex[12])}
                    r="8"
                    fill="transparent"
                    stroke="#a855f7"
                    strokeWidth="1"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </svg>

                {/* Floating Scale Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={`badge-${finalThriveX}`}
                  transition={{ delay: 1.6, type: "spring" }}
                  className="absolute top-0 right-[-10px] md:right-0 bg-purple-600 text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-2xl shadow-purple-900/40 tracking-widest z-30 flex items-center gap-2"
                >
                  <TrendingUp className="w-3 h-3" />
                  HYPER-SCALE ACTIVE
                </motion.div>
              </div>

              {/* Footer Callout */}
              <div className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-10 gap-8">
                <div className="flex items-center space-x-5">
                  <div className="p-4 rounded-3xl bg-blue-500/10 text-blue-400 border border-blue-500/10 shadow-inner">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none block">
                      Estimated Compounded
                    </span>
                    <span className="text-sm font-bold text-slate-300 uppercase tracking-[0.1em]">Monthly Output</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <motion.div 
                    key={`total-${finalThriveX}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter"
                  >
                    {finalThriveX >= 1000000 ? `${(finalThriveX/1000000).toFixed(1)}M+` : finalThriveX.toLocaleString()}
                  </motion.div>
                  <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mt-1">Forecasted Reach • Year 1</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTrajectory;
