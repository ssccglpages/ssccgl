import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, ExternalLink, FileText, DownloadCloud } from 'lucide-react';

const OLD_PAPERS = [
  { 
    category: "SSC GD Constable", 
    icon: "👮", 
    color: "blue",
    papers: [
      { year: "2021", tier: "17 Nov, Shift 3", url: "https://cdn-images.prepp.in/public/image/f46f79e5b0723ceaa3cf98d3c19f3a92.pdf" },
      { year: "2011", tier: "Solved Paper", url: "https://cdn-images.prepp.in/public/image/SSC_GD_2011_Paper_with_Solutions_82d7d7f8b96eb7c4847bd5cfc3e86093.pdf" },
      { year: "2018", tier: "13 Feb 2019, Shift 1", url: "https://cdn-images.prepp.in/public/image/ssc-gd-2018-question-paper-pdf-english-feb-13-2019-shift-1-1763382419.pdf" },
      { year: "General", tier: "Previous Year Paper", url: "https://cdn-images.prepp.in/public/image/c5c20aafb6356966306824bf60bbaf33.pdf" }
    ]
  },
  { 
    category: "SSC MTS", 
    icon: "📝", 
    color: "purple",
    papers: [
      { year: "2023", tier: "1 Sept, Shift 1", url: "https://cdn-images.prepp.in/public/image/SSC_MTS_2023_Tier_1_Sept_1_Shift_1_Question_Paper_with_Answer_Key_Download_PDF_2e2f4faf122d41a83cc758d1cbefb189.pdf" },
      { year: "2022", tier: "8 July, Shift 3", url: "https://cdn-images.prepp.in/public/image/SSCMTSPreviousYearPaperHeldon8July2022Shift3_36a3cbe9656b7685db1341896eebf2c9.pdf" },
      { year: "2021", tier: "6 July 2022, Shift 1", url: "https://cdn-images.prepp.in/public/image/SSC_MTS_2021_Held_On_6_July_2022_Shift_1_English_b452323648cdd8fbbdae918ff18f818a.pdf" },
      { year: "2021", tier: "8 Oct, Shift 1", url: "https://cdn-images.prepp.in/public/image/SSCMTSPreviousYearPaperHeldon8Oct2021Shift1_4c926bca4f1612d509c4f31818208a04.pdf" },
      { year: "2022", tier: "14 July, Shift 2", url: "https://cdn-images.prepp.in/public/image/SSCMTSPreviousYearPaperHeldon14July2022Shift2_f88bfaa53a4a2f241937c5b1001581f5.pdf" }
    ]
  },
  { 
    category: "UP Police Constable", 
    icon: "🚔", 
    color: "orange",
    papers: [
      { year: "2024", tier: "17 Feb, Shift 1", url: "https://cdn-images.prepp.in/public/image/UP_Police_Constable_Question_Paper_PDF_17_Feb_2024_Shift_1__b2048a1b171ab30b2a3fd64a753a6e42.pdf" },
      { year: "2024", tier: "25 Aug, Shift 1", url: "https://cdn-images.prepp.in/public/image/UP_Police_Constable_Question_Paper_25_Aug_2024_1st_Shift_New_f56396dd95f660b052e36db2040825b3.pdf" },
      { year: "2024", tier: "25 Aug, Shift 2", url: "https://cdn-images.prepp.in/public/image/UP_Police_Constable_25_Aug_2024_2nd_Shift_Question_Paper_New_de254dad40c8c671ef6e1138dcce79f8.pdf" },
      { year: "2024", tier: "30 Aug, Shift 1", url: "https://cdn-images.prepp.in/public/image/up-police-constable-2023-question-paper-pdf-aug-30-2024-shift-1-1768295529.pdf" },
      { year: "2024", tier: "31 Aug, Shift 1", url: "https://cdn-images.prepp.in/public/image/UP_Police_Constable_Question_Paper_31_Aug_2024_1st_Shift_4f2d388175b8e16286e4bcfc7428dd9c.pdf" }
    ]
  },
  { 
    category: "Delhi Police", 
    icon: "🏛️", 
    color: "red",
    papers: [
      { year: "2023", tier: "Constable 14 Nov, Shift 3", url: "https://cdn-images.prepp.in/public/image/Delhi_Police_Constable_Question_Paper_14_Nov_2023_Shift_3_76b7f4c9e327e0a4e6b93523933ffc50.pdf" },
      { year: "2023", tier: "Constable 15 Nov, Shift 3", url: "https://cdn-images.prepp.in/public/image/Delhi_Police_Constable_Question_Paper_15_Nov_2023_Shift_3_6b22cc83016f1ad66ad1f00469ceb992.pdf" },
      { year: "2024", tier: "SI 27 June, Shift 1 (English)", url: "https://cdn-images.prepp.in/public/image/SSC_CPO_PRE_2024_AnswerKey_Compilation_English_June_27_Shift_1_5eebc080a7817e50eef230fac8666d96.pdf" },
      { year: "2024", tier: "SI 27 June, Shift 1 (Hindi)", url: "https://cdn-images.prepp.in/public/image/SSC_CPO_PRE_2024_AnswerKey_Compilation_Hindi_June_27_Shift_1_6520f074b41e0b10944273d850ce50c9.pdf" }
    ]
  },
  { 
    category: "SSC CGL Prep Books", 
    icon: "📚", 
    color: "emerald",
    papers: [
      { year: "Rakesh Yadav", tier: "Arithmetic (English)", url: "https://drive.google.com/file/d/1_1n2D_vWKHvkIyMJ19A6kasiCj_B7s0P/view" },
      { year: "Rakesh Yadav", tier: "7300 Number System Booster", url: "https://drive.google.com/file/d/1ISoOY7HXkKI6vkAY4oeHUhCDzW9zp068/view" },
      { year: "Pinnacle", tier: "General Studies (TCS MCQ)", url: "http://103.203.175.90:81/fdScript/RootOfEBooks/E%20Book%20collection%20-%202026%20-%20B/UPSC/Pinnacle%20General%20Studies.pdf" },
      { year: "Lucent", tier: "General Science (English)", url: "http://103.203.175.90:81/fdScript/RootOfEBooks/E%20Book%20collection%20-%202025%20-%20C/ENGLISH/Lucent%E2%80%99s%20General%20Science%20Book%20%20in%20English.pdf" },
      { year: "SSC 2024", tier: "GS Solved Papers Chapterwise", url: "http://103.203.175.90:81/fdScript/RootOfEBooks/E%20Book%20collection%20-%202026%20-%20F/LEADERSHIP/UPSC/1801_SSC_GENERAL_STUDIES_CHAPTERWISE_&_TOPICWISE_SOLVED_PAPERS_2024.pdf" },
      { year: "SSC", tier: "Objective English Chapterwise", url: "http://103.203.175.90:81/fdScript/RootOfEBooks/E%20Book%20collection%20-%202023%20-%20A/COMPETATIVE%20EXAMS%20ALL/SSC_OBJECTIVE_ENGLISH_CHAPTER_WISE.pdf" }
    ]
  }
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
              Direct PDF downloads for previous year papers and preparation books.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {OLD_PAPERS.map((section, idx) => (
          <Card key={idx} className="p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8 transition-all active:scale-[0.98]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-black text-slate-800 leading-none flex items-center gap-3">
                  <span className="text-4xl">{section.icon}</span>
                  {section.category}
                </h3>
                <span className={`bg-${section.color}-50 text-${section.color}-600 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-${section.color}-100 mt-2 inline-block`}>
                  {section.papers.length} PDFs
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Download Links</p>
              {section.papers.map((paper, paperIdx) => (
                <Button
                  key={paperIdx}
                  variant="ghost"
                  className="w-full justify-between items-center h-auto p-5 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 group transition-all"
                  onClick={() => window.open(paper.url, '_blank')}
                >
                  <div className="flex items-center gap-4 text-emerald-800">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                      <DownloadCloud className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-xs truncate max-w-[200px]">{paper.year}</span>
                      <span className="font-medium text-[10px] text-slate-500">{paper.tier}</span>
                    </div>
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
            "Solve the latest shifts immediately. They reflect the recent increase in difficulty and new exam patterns."
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
