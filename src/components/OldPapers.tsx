import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, ExternalLink, FileText, DownloadCloud } from 'lucide-react';

const OLD_PAPERS = [
  { year: "2025", tier: "Tier 1 Solved", shifts: [
    { date: "September 2025 (latest)", url: "https://sscstudy.com/ssc-cgl-previous-year-question-paper-pdf-2025-tier-i-all-shifts/" }
  ]},
  { year: "2024", tier: "Tier 1 & 2 Complete", shifts: [
    { date: "Sep 2024 Shifts Full Set", url: "https://sscportal.in/cgl/tier-1/papers/2024" }
  ]},
  { year: "2023", tier: "Tier 1 & 2 Solved", shifts: [
    { date: "All Shifts Solved Book", url: "https://testbook.com/ssc-cgl-exam/previous-year-papers" }
  ]},
  { year: "2022", tier: "Tier 1 & 2 Archive", shifts: [
    { date: "Dec 2022 Sessions PDF", url: "https://testbook.com/ssc-cgl-exam/previous-year-papers" }
  ]},
  { year: "2021", tier: "Tier 1 Archive", shifts: [
    { date: "August 2021 Shifts", url: "https://testbook.com/ssc-cgl-exam/previous-year-papers" }
  ]}
];

export const OldPapers: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-emerald-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
            <Archive className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight leading-none uppercase">Paper Repo</h2>
            <p className="text-emerald-100 font-medium text-xs leading-relaxed opacity-90">
              Validated shift archives from 2021 to 2025. Follow the TCS pattern shift.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {OLD_PAPERS.map(paper => (
          <Card key={paper.year} className="p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8 transition-all active:scale-[0.98]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black text-slate-800 leading-none">{paper.year}</h3>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-100 mt-2 inline-block">
                  {paper.tier}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <FileText className="w-6 h-6 text-slate-300" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">PDF Shift Links</p>
              {paper.shifts.map((shift, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="w-full justify-between items-center h-auto p-5 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 group transition-all"
                  onClick={() => window.location.href = shift.url}
                >
                  <div className="flex items-center gap-4 text-emerald-800">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                      <DownloadCloud className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs truncate max-w-[150px]">{shift.date}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300" />
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-orange-50 p-8 rounded-[2rem] border border-orange-100/50 flex flex-col items-center text-center space-y-4">
        <Sparkles className="w-6 h-6 text-orange-400" />
        <div className="space-y-2">
          <h4 className="text-lg font-black text-orange-900 leading-none tracking-tight">Strategy Alert</h4>
          <p className="text-xs font-semibold text-orange-700/70 leading-relaxed italic">
            "Solve the 2025 Sept-Oct shifts immediately. They reflect the recent increase in Reasoning complexity and the new Computer syllabus."
          </p>
        </div>
      </div>
    </div>
  );
};


const Sparkles = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M3 5h4" /><path d="M19 17v4" /><path d="M17 19h4" />
  </svg>
);
