import React from 'react';
import { Home, Calendar, Archive, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  view: 'portal' | 'papers' | 'resources';
  setView: (view: 'portal' | 'papers' | 'resources') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ view, setView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2 pb-6 pt-2 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.05)] safe-area-bottom">
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-2xl transition-all ${
          view === 'portal' ? 'text-indigo-600' : 'text-slate-400'
        }`}
        onClick={() => setView('portal')}
      >
        <Home className={`w-5 h-5 ${view === 'portal' ? 'fill-indigo-50' : ''}`} />
        <span className="text-[9px] font-bold uppercase tracking-tight">Home</span>
      </Button>

      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-2xl transition-all ${
          view === 'resources' ? 'text-indigo-600' : 'text-slate-400'
        }`}
        onClick={() => setView('resources')}
      >
        <BookOpen className={`w-5 h-5 ${view === 'resources' ? 'fill-indigo-50' : ''}`} />
        <span className="text-[9px] font-bold uppercase tracking-tight">Resources</span>
      </Button>

      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-2xl transition-all ${
          view === 'papers' ? 'text-indigo-600' : 'text-slate-400'
        }`}
        onClick={() => setView('papers')}
      >
        <Archive className={`w-5 h-5 ${view === 'papers' ? 'fill-indigo-50' : ''}`} />
        <span className="text-[9px] font-bold uppercase tracking-tight">Papers</span>
      </Button>
    </nav>
  );
};

