import React, { useMemo } from 'react';
import { 
  mathLibrary, 
  reasoningLibrary, 
  englishLibrary, 
  computerLibrary,
  gsLibrary,
  statsLibrary,
  currentAffairsLibrary,
  scienceLibrary,
  polityLibrary,
  geographyLibrary,
  economicsLibrary,
  historyLibrary,
  staticGKLibrary,
  VideoTask
} from '../data/videoLibrary';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  MonitorPlay, 
  Youtube, 
  Sparkles,
  Calculator,
  Brain,
  Type,
  Newspaper,
  FlaskConical,
  Scale,
  Globe2,
  TrendingUp,
  Scroll,
  Trophy,
  Monitor,
  BarChart3,
  PencilLine,
  Layout
} from 'lucide-react';

interface PlanTrackerProps {
  selectedTier: 1 | 2;
  setSelectedTier: (t: 1 | 2) => void;
  completedDays: number[];
  onToggleDay: (day: number) => void;
  onOpenVideo: (id: string, title: string) => void;
  onOpenLecture: (lecture: VideoTask, day: number) => void;
}

const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case 'Math': return <Calculator className="w-3 h-3" />;
    case 'Reasoning': return <Brain className="w-3 h-3" />;
    case 'English': return <Type className="w-3 h-3" />;
    case 'Current Affairs': return <Newspaper className="w-3 h-3" />;
    case 'Science': return <FlaskConical className="w-3 h-3" />;
    case 'Polity': return <Scale className="w-3 h-3" />;
    case 'Geography': return <Globe2 className="w-3 h-3" />;
    case 'Economics': return <TrendingUp className="w-3 h-3" />;
    case 'History': return <Scroll className="w-3 h-3" />;
    case 'Static GK': return <Trophy className="w-3 h-3" />;
    case 'Computer': return <Monitor className="w-3 h-3" />;
    case 'Statistics & DI': return <BarChart3 className="w-3 h-3" />;
    case 'Practice': return <PencilLine className="w-3 h-3" />;
    default: return <Layout className="w-3 h-3" />;
  }
};

export const PlanTracker: React.FC<PlanTrackerProps> = ({ 
  selectedTier, 
  setSelectedTier, 
  completedDays, 
  onToggleDay, 
  onOpenVideo,
  onOpenLecture
}) => {

  const groupedPlan = useMemo(() => {
    const localPlan = [];
    const totalDays = selectedTier === 1 ? 120 : 30; // Tier 1 is 120, Tier 2 is 30 for specialization
    
    for (let i = 1; i <= totalDays; i++) {
      let tasks = [];
      
      if (selectedTier === 1) {
        // Tier 1 Subjects: Math, Reasoning, English, GS (fragmented)
        tasks.push({ subject: 'Math', ...mathLibrary[(i - 1) % mathLibrary.length] });
        tasks.push({ subject: 'Reasoning', ...reasoningLibrary[(i - 1) % reasoningLibrary.length] });
        tasks.push({ subject: 'English', ...englishLibrary[(i - 1) % englishLibrary.length] });
        tasks.push({ subject: 'Current Affairs', ...currentAffairsLibrary[(i - 1) % currentAffairsLibrary.length] });
        tasks.push({ subject: 'Science', ...scienceLibrary[(i - 1) % scienceLibrary.length] });
        tasks.push({ subject: 'Polity', ...polityLibrary[(i - 1) % polityLibrary.length] });
        tasks.push({ subject: 'Geography', ...geographyLibrary[(i - 1) % geographyLibrary.length] });
        tasks.push({ subject: 'Economics', ...economicsLibrary[(i - 1) % economicsLibrary.length] });
        tasks.push({ subject: 'History', ...historyLibrary[(i - 1) % historyLibrary.length] });
        tasks.push({ subject: 'Static GK', ...staticGKLibrary[(i - 1) % staticGKLibrary.length] });
      } else {
        // Tier 2 Subjects: Computer, Statistics & DI
        tasks.push({ subject: 'Computer', ...computerLibrary[(i - 1) % computerLibrary.length] });
        tasks.push({ subject: 'Statistics & DI', ...statsLibrary[(i - 1) % statsLibrary.length] });
      }
      
      localPlan.push({ day: i, tasks });
    }
    
    // Group into weeks
    const weeks = [];
    for (let i = 0; i < localPlan.length; i += 7) {
      weeks.push(localPlan.slice(i, i + 7));
    }
    return weeks;
  }, [selectedTier]);

  return (
    <div className="space-y-12">
      {/* Tier Selection */}
      <div className="flex gap-4 p-1.5 bg-slate-100 rounded-[2rem]">
        {[1, 2].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTier(t as 1 | 2)}
            className={`flex-1 py-4 px-6 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${
              selectedTier === t 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Tier {t} Syllabus
          </button>
        ))}
      </div>

      {/* Week Sections */}
      <div className="space-y-10">
        {groupedPlan.map((week, wIdx) => (
          <div key={wIdx} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-slate-950 text-white px-5 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest">
                WEEK {Math.floor((week[0].day - 1) / 7) + 1}
              </div>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {week.map(day => (
                <Card 
                  key={day.day}
                  className={`rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden ${
                    completedDays.includes(selectedTier === 1 ? day.day : day.day + 120) ? 'bg-slate-50/70 border-slate-200' : 'bg-white'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={() => onToggleDay(selectedTier === 1 ? day.day : day.day + 120)}
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all active:scale-90 ${
                          completedDays.includes(selectedTier === 1 ? day.day : day.day + 120) 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : 'bg-white border-slate-200 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <div>
                        <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">
                          Day {selectedTier === 1 ? day.day : day.day + 120}
                        </p>
                        <h4 className="text-lg font-black text-slate-800 tracking-tight">Syllabus Goal</h4>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {day.tasks.map((task, idx) => (
                        <div 
                          key={idx}
                          className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between gap-3"
                        >
                          <div 
                            className="flex-1 min-w-0 cursor-pointer group/title"
                            onClick={() => onOpenLecture(task, selectedTier === 1 ? day.day : day.day + 120)}
                          >
                            <Badge 
                              className={`text-[8px] px-2 py-0.5 font-black uppercase mb-1 shadow-none border-none flex items-center gap-1 w-fit ${
                                task.subject === 'Math' ? 'bg-blue-100 text-blue-700' :
                                task.subject === 'English' ? 'bg-indigo-100 text-indigo-700' :
                                task.subject === 'Reasoning' ? 'bg-purple-100 text-purple-700' :
                                task.subject === 'Statistics & DI' ? 'bg-orange-100 text-orange-700' :
                                task.subject === 'Current Affairs' ? 'bg-rose-100 text-rose-700' :
                                task.subject === 'Science' ? 'bg-cyan-100 text-cyan-700' :
                                task.subject === 'Polity' ? 'bg-sky-100 text-sky-700' :
                                task.subject === 'Geography' ? 'bg-amber-100 text-amber-700' :
                                task.subject === 'Economics' ? 'bg-lime-100 text-lime-700' :
                                task.subject === 'History' ? 'bg-yellow-100 text-yellow-700' :
                                task.subject === 'Static GK' ? 'bg-violet-100 text-violet-700' :
                                'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {getSubjectIcon(task.subject)}
                              {task.subject}
                            </Badge>
                            <h5 className="font-bold text-slate-800 text-[11px] truncate group-hover/title:text-indigo-600 transition-colors">
                              {task.title}
                            </h5>
                          </div>
                          
                          <div className="flex items-center gap-2">
                             <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 bg-white border border-slate-100 text-slate-500 rounded-xl"
                                onClick={() => onOpenVideo(task.videoId, task.title)}
                              >
                                <MonitorPlay className="w-5 h-5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 bg-white border border-slate-100 text-red-500 rounded-xl"
                                onClick={() => window.location.href = `https://www.youtube.com/watch?v=${task.videoId}`}
                              >
                                <Youtube className="w-5 h-5" />
                              </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
