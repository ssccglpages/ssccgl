import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Youtube, 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  Volume1, 
  VolumeX,
  Share2,
  ExternalLink,
  Info,
  Calendar,
  Layers,
  RotateCcw,
  RotateCw
} from "lucide-react";
import YouTube, { YouTubeProps } from 'react-youtube';
import { VideoTask } from '../data/videoLibrary';

interface LectureViewProps {
  lecture: VideoTask;
  onBack: () => void;
  day: number;
}

export const LectureView: React.FC<LectureViewProps> = ({ lecture, onBack, day }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const youtubeUrl = `https://www.youtube.com/watch?v=${lecture.videoId}`;

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const adjustVolume = (amount: number) => {
    if (!playerRef.current) return;
    const newVolume = Math.min(Math.max(volume + amount, 0), 100);
    setVolume(newVolume);
    playerRef.current.setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const skipTime = (amount: number) => {
    if (!playerRef.current) return;
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + amount, true);
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      controls: 1,
    },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white animate-in fade-in slide-in-from-right-10 duration-500 pb-32">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 rounded-full"
          onClick={onBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-black tracking-tight truncate">{lecture.title}</h1>
          <p className="text-[9px] text-white/50 font-black uppercase tracking-widest">
            Day {day} • {lecture.subject}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="text-white/50 hover:text-white rounded-full">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Modern Video Player Stage */}
        <div className="relative w-full aspect-video bg-black md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
          <YouTube 
            videoId={lecture.videoId} 
            opts={opts} 
            onReady={onPlayerReady}
            onStateChange={(e) => setIsPlaying(e.data === 1)}
            className="w-full h-full"
          />
          
          {/* Overlay Controls (Mobile Friendly) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
             <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white/70 hover:text-white h-10 w-10"
                      onClick={() => skipTime(-10)}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white h-10 w-10 hover:bg-white/10"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white/70 hover:text-white h-10 w-10"
                      onClick={() => skipTime(10)}
                    >
                      <RotateCw className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white h-10 w-10 hover:bg-white/10"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="text-red-500" /> : <Volume2 />}
                    </Button>
                    <div className="hidden sm:block w-20 h-1 bg-white/20 rounded-full ml-1 overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: `${volume}%` }} />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="text-white/70 hover:text-white h-10 w-10">
                      <Layers className="w-5 h-5" />
                   </Button>
                </div>
             </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="px-6 space-y-8">
           <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                 <Badge className="bg-indigo-600 text-white border-none px-3 py-1 font-bold tracking-wide uppercase text-[10px]">
                   Lecture Room
                 </Badge>
                 <Badge className="bg-white/10 text-white/80 border-none px-3 py-1 font-bold tracking-wide uppercase text-[10px] flex items-center gap-2">
                   <Calendar className="w-3 h-3" /> Day {day} Goal
                 </Badge>
              </div>
              <h2 className="text-3xl font-black tracking-tighter leading-tight text-white/95">
                {lecture.title}
              </h2>
           </div>

           <div className="grid grid-cols-1 gap-4">
              <Card className="bg-white/5 border-white/10 p-6 rounded-[2rem] space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
                       <Youtube className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white tracking-tight">Open in YouTube App</h3>
                       <p className="text-xs text-white/40 leading-relaxed max-w-sm">
                         Jump to the official YouTube app for features like picture-in-picture, background play, and high-quality 4K streaming.
                       </p>
                    </div>
                 </div>
                 <Button 
                   className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-14 font-black uppercase tracking-widest text-xs flex gap-3 shadow-lg shadow-red-900/20"
                   onClick={() => window.open(youtubeUrl, '_blank')}
                 >
                    Launch Official App <ExternalLink className="w-4 h-4" />
                 </Button>
              </Card>
           </div>

           <div className="p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-[2rem] flex items-start gap-4">
              <div className="bg-indigo-500 text-white p-2 rounded-lg shrink-0">
                 <Info className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-indigo-200">Study Tip</p>
                 <p className="text-xs text-white/60 leading-relaxed">
                   Turn your phone to landscape mode for a larger video view. Take notes of key points discussed by the faculty to reinforce your memory.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
