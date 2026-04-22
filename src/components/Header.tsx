import React, { useState } from 'react';
import { Search, Target } from 'lucide-react';

export const Header: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Direct same-tab redirection as requested
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Auto-redirect to Instagram when user types "QWERTY UIOP"
    if (value.toUpperCase() === 'QWERTY UIOP') {
      window.location.href = 'https://www.instagram.com';
    }
  };

  return (
    <header className="p-4 md:px-8 bg-white border-b border-slate-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
               <Target className="w-5 h-5 text-white" />
            </div>
            <div>
               <h1 className="font-black text-sm tracking-tight leading-none text-slate-800 uppercase">SSC CGL PORTAL</h1>
               <p className="text-[8px] font-black text-slate-400 mt-0.5 uppercase tracking-widest">Scientific Prep</p>
            </div>
         </div>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input 
          type="text" 
          value={query}
          onChange={handleInputChange}
          placeholder="Search topics, videos, syllabus..."
          className="w-full h-12 bg-slate-100 border border-slate-200 rounded-2xl px-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <button type="submit" className="hidden">Search</button>
      </form>
    </header>
  );
};
