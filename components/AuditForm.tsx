
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Sparkles, Instagram, Target, User, Mail, Phone } from 'lucide-react';
import { AuditFormData } from '../types';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwoTfNkeE4133UUANBObga7CmDklRVT5MMb548l93nObiYYWD8NKzs9QrpvQ3N9oXuo/exec';

const AuditForm: React.FC = () => {
  const [formData, setFormData] = useState<AuditFormData>({
    name: '',
    email: '',
    phoneNumber: '',
    instagramHandle: '',
    niche: '',
    goal: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('name', formData.name);
      searchParams.append('email', formData.email);
      searchParams.append('phoneNumber', formData.phoneNumber);
      searchParams.append('instagramHandle', formData.instagramHandle);
      searchParams.append('niche', formData.niche);
      searchParams.append('goal', formData.goal);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: searchParams
      });

      setLoading(false);
      setSubmitted(true);
      
      const existing = JSON.parse(localStorage.getItem('thrivex_submissions') || '[]');
      const newEntry = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        status: 'pending'
      };
      localStorage.setItem('thrivex_submissions', JSON.stringify([newEntry, ...existing]));
    } catch (err) {
      console.error('Submission error:', err);
      setError('Connection interrupted. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden" id="audit">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto glass rounded-[40px] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="md:w-2/5 p-12 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white flex flex-col justify-between relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
              <Instagram className="w-64 h-64 text-white absolute rotate-12 scale-150 top-0 left-0" />
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-heading leading-tight">Get a Free <br/>Social Audit</h2>
                <p className="text-purple-100/80 mb-8 text-lg">
                  We'll analyze your profile and sync your results directly to our growth system.
                </p>
                <ul className="space-y-6">
                  {["Bio Optimization", "Hook Analysis", "Growth Roadmap"].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-400/20 text-green-300 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="md:w-3/5 p-8 lg:p-16 bg-slate-900/40 backdrop-blur-xl relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-8 border border-green-500/30">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4 font-heading text-white">Sync Complete!</h3>
                  <p className="text-slate-400 text-lg mb-8 max-w-sm">
                    Awesome! We've received your request. Check your email for our analysis soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="text"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="email"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="tel"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phoneNumber}
                          onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">IG Handle</label>
                      <div className="relative">
                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="text"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                          placeholder="@username"
                          value={formData.instagramHandle}
                          onChange={e => setFormData({...formData, instagramHandle: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Niche</label>
                    <div className="relative">
                      <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        required
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                        placeholder="e.g. Fitness, SaaS"
                        value={formData.niche}
                        onChange={e => setFormData({...formData, niche: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Main Goal</label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-purple-500/50 resize-none transition-all"
                      placeholder="What do you want to achieve?"
                      value={formData.goal}
                      onChange={e => setFormData({...formData, goal: e.target.value})}
                    />
                  </div>

                  <motion.button 
                    disabled={loading}
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-white text-slate-950 font-bold rounded-2xl hover:bg-purple-100 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Secure Free Audit</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                  {error && <p className="text-red-400 text-xs text-center font-bold">{error}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditForm;
