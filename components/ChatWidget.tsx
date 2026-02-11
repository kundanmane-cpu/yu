
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Zap, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Welcome to ThriveX. I'm your growth strategist. How can we help you scale your audience today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are the ThriveX Lead Growth Strategist. Your goal is to help creators and founders understand how ThriveX can help them grow on Instagram through high-retention Reels, organic systems, and content strategy. Keep responses professional, futuristic, encouraging, and concise. Refer to ThriveX services as 'our proprietary systems'. Mention services like 'Reels Editing', 'Organic Growth System', and 'Free Audit' when relevant. Never mention Google, Gemini, or being an AI; act as a high-level digital consultant.",
        },
      });

      const aiText = response.text || "Connection to the strategy hub was interrupted. Please try again.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "The strategy hub is currently updating. Please try again in a moment!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] glass rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center relative">
                  <Zap className="w-5 h-5 text-white" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">ThriveX Strategist</h3>
                  <p className="text-[10px] text-purple-100 uppercase tracking-widest font-bold">Expert Support • Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth bg-slate-950/40"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none shadow-lg' 
                      : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex space-x-1.5">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-white/5 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a strategist..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-600"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-purple-600 rounded-xl text-white disabled:opacity-50 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl flex items-center justify-center text-white relative group border border-white/10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <MessageSquare className="w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-slate-950 shadow-lg">
                1
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 rounded-2xl animate-pulse-glow -z-10 opacity-50"></div>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
