import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Youtube, X, Play, Pause, Volume2, Volume1, VolumeX, RotateCcw, RotateCw } from "lucide-react";
import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoModalProps {
  id: string | null;
  title: string | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ id, title, onClose }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  if (!id) return null;

  const youtubeUrl = `https://www.youtube.com/watch?v=${id}`;

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
      controls: 1, // Standard controls still available
    },
  };

  return (
    <Dialog open={!!id} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[100vw] h-[100vh] md:h-auto md:max-w-4xl p-0 overflow-hidden border-none rounded-none md:rounded-[2.5rem] bg-black">
        <div className="flex flex-col h-full bg-slate-900">
          {/* Header */}
          <div className="bg-slate-900 p-4 border-b border-white/5 flex items-center justify-between gap-4">
             <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm truncate">{title}</h3>
                <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider">SSC CGL Lecture</p>
             </div>
             <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 rounded-full"
                onClick={onClose}
              >
               <X className="w-6 h-6" />
             </Button>
          </div>

          {/* Player area */}
          <div className="flex-1 flex flex-col items-center justify-center bg-black">
            <div className="w-full aspect-video">
              <YouTube 
                videoId={id} 
                opts={opts} 
                onReady={onPlayerReady}
                onStateChange={(e) => setIsPlaying(e.data === 1)}
                className="w-full h-full"
                id="yt-player"
              />
            </div>
            
            {/* Custom Interactive Controls */}
            <div className="w-full bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/10 h-10 w-10 shrink-0"
                  onClick={() => adjustVolume(-10)}
                >
                  <Volume1 className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white hover:bg-white/10 h-10 w-10 shrink-0"
                  onClick={toggleMute}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5" />}
                </Button>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
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
                  className="bg-white/10 text-white hover:bg-white/20 h-14 w-14 rounded-full border border-white/20 shrink-0"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
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

              <div className="hidden md:block w-24">
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-300" 
                    style={{ width: `${volume}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-slate-900 border-t border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-14 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-lg"
                onClick={() => window.location.href = youtubeUrl}
              >
                <Youtube className="w-6 h-6" />
                Open in YouTube
              </Button>
              <Button 
                variant="outline"
                className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl h-14 font-black uppercase text-xs tracking-widest"
                onClick={onClose}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

