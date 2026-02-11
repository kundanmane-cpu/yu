
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Trash2, Calendar, Instagram, User, Mail, Search, Phone } from 'lucide-react';
import { AuditFormData } from '../types';

interface Submission extends AuditFormData {
  id: number;
  timestamp: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadSubmissions = () => {
    const data = JSON.parse(localStorage.getItem('thrivex_submissions') || '[]');
    setSubmissions(data);
  };

  useEffect(() => {
    loadSubmissions();
    const handleStorage = () => loadSubmissions();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const deleteSubmission = (id: number) => {
    const updated = submissions.filter(s => s.id !== id);
    localStorage.setItem('thrivex_submissions', JSON.stringify(updated));
    setSubmissions(updated);
  };

  const filteredSubmissions = submissions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.instagramHandle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-24 bg-slate-950 border-t border-white/5" id="dashboard">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold font-heading text-white">Submissions Hub</h2>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((sub) => (
            <motion.div
              key={sub.id}
              className="glass p-6 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
                  {sub.name.charAt(0)}
                </div>
                <button onClick={() => deleteSubmission(sub.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-bold text-white text-lg">{sub.name}</h4>
              
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="truncate">{sub.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-green-400" />
                  <span>{sub.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>{sub.instagramHandle}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex flex-col space-y-2">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider line-clamp-2 italic">
                  Goal: {sub.goal}
                </p>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{sub.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredSubmissions.length === 0 && (
            <div className="col-span-full py-20 text-center glass rounded-3xl border border-dashed border-white/10">
              <p className="text-slate-500 font-medium">No leads found in the matrix.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
