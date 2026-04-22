import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, BookOpen, Layers } from 'lucide-react';
import { practiceLibrary, VideoTask } from '../data/videoLibrary';

interface ResourcesProps {
  onOpenVideo: (id: string, title: string) => void;
  onOpenLecture: (lecture: VideoTask, day: number) => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onOpenVideo, onOpenLecture }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4">
          <Badge className="bg-indigo-500 hover:bg-indigo-600 text-[10px] font-black uppercase tracking-widest border-none">Expert Curated</Badge>
          <h2 className="text-4xl font-black tracking-tighter leading-none">
            Additional<br/>
            <span className="text-slate-400">Resources.</span>
          </h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">
            Supplementary practice sets and subject marathons to sharpen your edge.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen className="w-32 h-32 rotate-12" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Layers className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tight">Practice Marathons</h3>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Aagaz Batch, Nayak 2.0 & More</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceLibrary.map((item) => (
            <Card 
              key={item.id}
              onClick={() => onOpenLecture(item, 0)} // Day 0 for extra resources
              className="group p-5 rounded-[1.5rem] border-slate-200/60 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer bg-white overflow-hidden relative"
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                  <Play className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:fill-indigo-600 transition-all" />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge className="bg-orange-100 text-orange-700 text-[8px] font-black uppercase mb-1 shadow-none border-none">Practice Set</Badge>
                  <h4 className="font-bold text-slate-800 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-400">GS Mixed Subjects</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-indigo-50/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
