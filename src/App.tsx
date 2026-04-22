import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { PlanTracker } from './components/PlanTracker';
import { OldPapers } from './components/OldPapers';
import { Resources } from './components/Resources';
import { LectureView } from './components/LectureView';
import { VideoModal } from './components/VideoModal';
import { VideoTask } from './data/videoLibrary';
import { Target, Trophy } from 'lucide-react';

const App = () => {
  const [view, setView] = useState<'portal' | 'papers' | 'resources' | 'lecture'>('portal');
  const [selectedTier, setSelectedTier] = useState<1 | 2>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);
  const [activeLecture, setActiveLecture] = useState<{ lecture: VideoTask; day: number } | null>(null);

  // Smart Navigation - Support Android Hardware Back Button
  useEffect(() => {
    const handlePopState = () => {
      if (activeVideo) {
        setActiveVideo(null);
      } else if (activeLecture) {
        setActiveLecture(null);
        setView('portal');
      } else if (view !== 'portal') {
        setView('portal');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeVideo, view]);

  const handleOpenVideo = (id: string, title: string) => {
    window.history.pushState({ type: 'video' }, '');
    setActiveVideo({ id, title });
  };

  const handleSetView = (v: 'portal' | 'papers' | 'resources' | 'lecture') => {
    if (v !== view) window.history.pushState({ type: 'view' }, '');
    setView(v);
  };

  const handleOpenLecture = (lecture: VideoTask, day: number) => {
    setActiveLecture({ lecture, day });
    handleSetView('lecture');
  };

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('ssc_cgl_mastery_progress');
    if (saved) setCompletedDays(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ssc_cgl_mastery_progress', JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleDay = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-indigo-100/80 pb-32">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        
        {view === 'portal' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Real Dashboard Info */}
            <div className="bg-indigo-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-100/20">
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter leading-none">
                    SSC CGL Path<br/>
                    <span className="text-indigo-200">
                      {selectedTier === 1 ? 'Tier 1 Mastery' : 'Tier 2 Selection'}
                    </span>
                  </h2>
                  <p className="text-sm text-indigo-100/70 font-medium leading-relaxed max-w-xs">
                    {selectedTier === 1 
                      ? '120-Day Comprehensive path for Math, Reasoning, English & GS.' 
                      : 'Specialized syllabus for Statistics, DI & Computer Science.'}
                  </p>
                </div>

                <div className="flex gap-4">
                   <div className="flex-1 items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black uppercase opacity-60 tracking-widest text-indigo-200">Targets Done</p>
                      <p className="text-2xl font-black tracking-tighter">{completedDays.length}</p>
                   </div>
                   <div className="flex-1 items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
                      <p className="text-[9px] font-black uppercase opacity-60 tracking-widest text-indigo-200">Current Day</p>
                      <p className="text-2xl font-black tracking-tighter">{completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1}</p>
                   </div>
                </div>
              </div>
              
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500 rounded-full blur-[80px] opacity-30" />
            </div>

            {/* Tracker Component */}
            <PlanTracker 
              selectedTier={selectedTier}
              setSelectedTier={setSelectedTier}
              completedDays={completedDays}
              onToggleDay={toggleDay}
              onOpenVideo={handleOpenVideo}
              onOpenLecture={handleOpenLecture}
            />
          </div>
        ) : view === 'papers' ? (
          <OldPapers />
        ) : view === 'lecture' && activeLecture ? (
          <LectureView 
            lecture={activeLecture.lecture} 
            day={activeLecture.day}
            onBack={() => window.history.back()}
          />
        ) : (
          <Resources onOpenVideo={handleOpenVideo} onOpenLecture={handleOpenLecture} />
        )}
      </main>

      <Navigation view={view} setView={handleSetView} />

      <VideoModal 
        id={activeVideo?.id || null} 
        title={activeVideo?.title || null} 
        onClose={() => window.history.back()} 
      />
    </div>
  );
};

export default App;
