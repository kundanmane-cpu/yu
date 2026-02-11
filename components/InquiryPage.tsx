
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Mail, 
  User, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  Phone 
} from 'lucide-react';
import { PRICING_PLANS } from '../constants';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0iTg0GOAbLPy_1YPEYwdm4zlXE5ygI7tDWRr81W1wmhbxjzXT5h5kN5rK5RX-qFG0/exec';

interface InquiryPageProps {
  onBack: () => void;
  initialPlan: string | null;
}

const InquiryPage: React.FC<InquiryPageProps> = ({ onBack, initialPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    handle: '',
    plan: initialPlan || PRICING_PLANS[1].name,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('name', formData.name);
      searchParams.append('email', formData.email);
      searchParams.append('phoneNumber', formData.phoneNumber);
      searchParams.append('instagramHandle', formData.handle);
      searchParams.append('niche', `Plan Selected: ${formData.plan}`);
      searchParams.append('goal', formData.message);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: searchParams
      });

      setSuccess(true);
      
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
      alert('Error connecting to the system. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group mb-12"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm tracking-widest uppercase">Back to Landing</span>
        </motion.button>

        {/* Pricing Selection Step */}
        {!success && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">Select Your Growth Path</h2>
              <p className="text-slate-400">Choose the system that matches your current scale and goals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PRICING_PLANS.map((plan) => (
                <motion.div 
                  key={plan.name}
                  onClick={() => setFormData(prev => ({ ...prev, plan: plan.name }))}
                  className={`p-8 rounded-[32px] border cursor-pointer transition-all duration-300 ${
                    formData.plan === plan.name 
                      ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_40px_rgba(168,85,247,0.2)] scale-[1.02]' 
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold font-heading">{plan.name}</h3>
                    {formData.plan === plan.name && <CheckCircle2 className="w-6 h-6 text-purple-500" />}
                  </div>
                  <div className="text-3xl font-bold mb-6 text-white">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-center space-x-2">
                        <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Form Step */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-16 rounded-[40px] border border-white/10 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-heading">Onboarding Initialized</h2>
                <p className="text-slate-400 text-lg mb-8">
                  Your details have been synced. Our strategy leads will contact you within 24 business hours.
                </p>
                <button 
                  onClick={onBack}
                  className="px-10 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-200 transition-all shadow-xl"
                >
                  Return to Home
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-32">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/20">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl font-bold font-heading mb-6 leading-tight text-white">
                      Finalize Your <span className="text-purple-500">Inquiry</span>
                    </h1>
                    <p className="text-slate-400">
                      Complete the transmission to secure your spot. We only take 3 new creators per month.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: <ShieldCheck className="w-4 h-4" />, text: "Direct Founder Access" },
                      { icon: <CheckCircle2 className="w-4 h-4" />, text: "NDA Protected Growth" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3 text-sm text-slate-300">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple-400">{item.icon}</div>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="lg:col-span-3 glass p-8 md:p-12 rounded-[40px] border border-white/10 space-y-6 shadow-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500/50 transition-all text-white outline-none"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="email"
                          placeholder="email@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500/50 transition-all text-white outline-none"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500/50 transition-all text-white outline-none"
                          value={formData.phoneNumber}
                          onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Instagram</label>
                      <div className="relative">
                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          required
                          type="text"
                          placeholder="@username"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500/50 transition-all text-white outline-none"
                          value={formData.handle}
                          onChange={e => setFormData({...formData, handle: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Growth Goals</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-slate-500" />
                      <textarea 
                        required
                        rows={4}
                        placeholder="What is your biggest bottleneck right now?"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500/50 transition-all text-white resize-none outline-none"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 flex items-center justify-center space-x-3 group relative overflow-hidden"
                  >
                    <span className="relative z-10">{loading ? 'Transmitting...' : 'Send Inquiry'}</span>
                    {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />}
                  </motion.button>
                </motion.form>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
