import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles, Sliders } from 'lucide-react';
import { focusMusic } from '../utils/focusMusicEngine';
import { motion, AnimatePresence } from 'motion/react';

interface BackgroundMusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const BackgroundMusicPlayer: React.FC<BackgroundMusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const [volume, setVolume] = useState<number>(0.35);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const trackName = focusMusic.getTrackName();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      focusMusic.setVolume(0);
    } else {
      setIsMuted(false);
      focusMusic.setVolume(val);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      focusMusic.setVolume(volume || 0.35);
    } else {
      setIsMuted(true);
      focusMusic.setVolume(0);
    }
  };

  return (
    <div className="fixed bottom-20 left-4 z-40">
      <div className="relative">
        {/* Main Floating Pill */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full backdrop-blur-md transition-all shadow-xl cursor-pointer border ${
            isPlaying
              ? 'bg-gradient-to-r from-[#FFF5F7]/95 via-white/95 to-[#FDF2F8]/95 border-[#F472B6] text-[#831843]'
              : 'bg-white/90 border-[#E2E8F0] text-[#5D4037] hover:bg-white'
          }`}
          title="Click to toggle music settings"
        >
          {/* Animated Equalizer Wave Bars when playing */}
          <div className="flex items-center gap-0.5 h-4 w-4 shrink-0 justify-center">
            {isPlaying ? (
              <>
                <span className="w-1 bg-[#BE185D] rounded-full h-3.5 animate-pulse" />
                <span className="w-1 bg-[#F472B6] rounded-full h-2 animate-bounce" />
                <span className="w-1 bg-[#DB2777] rounded-full h-4 animate-pulse" style={{ animationDelay: '150ms' }} />
              </>
            ) : (
              <Music className="w-4 h-4 text-[#8D6E63]" />
            )}
          </div>

          {/* Quick Play/Pause Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 shrink-0 ${
              isPlaying
                ? 'bg-[#BE185D] text-white shadow-xs'
                : 'bg-[#5D4037] text-white hover:bg-[#3E2723]'
            }`}
            title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          {/* Track Snippet Text */}
          <div className="hidden sm:flex flex-col text-left max-w-[150px] lg:max-w-[210px] overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#BE185D] truncate">
                {isPlaying ? 'Now Playing' : 'Background Music'}
              </span>
              {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
            </div>
            <p className="text-[11px] font-semibold text-[#2C1810] truncate" title={trackName}>
              Focus Music for Work & Studying
            </p>
          </div>

          {/* Expand Toggle Chevron */}
          <span className="text-[10px] font-bold text-[#BE185D] bg-[#FCE7F3] px-1.5 py-0.5 rounded-full">
            {isExpanded ? '✕' : '♫'}
          </span>
        </div>

        {/* Hover Tooltip showing full track title */}
        {showTooltip && !isExpanded && (
          <div className="absolute left-0 bottom-full mb-2 w-72 p-2.5 rounded-xl bg-[#2C1810] text-white text-[11px] leading-snug shadow-2xl z-50 pointer-events-none">
            <p className="font-bold text-[#F9A8D4] flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Bakery Background Music
            </p>
            <p className="text-gray-200">{trackName}</p>
          </div>
        )}

        {/* Expanded Music Control Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 bottom-full mb-3 w-80 p-4 rounded-2xl bg-white shadow-2xl border-2 border-[#FCE7F3] z-50 text-[#3E2723]"
            >
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#F5E6DF]">
                <div>
                  <span className="text-[10px] font-bold text-[#BE185D] uppercase tracking-wider block">
                    Study & Concentration Soundscape
                  </span>
                  <h4 className="text-xs font-bold text-[#2C1810] line-clamp-2 mt-0.5">
                    {trackName}
                  </h4>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Status & Visualizer */}
              <div className="my-3 p-2.5 rounded-xl bg-gradient-to-r from-pink-50 to-amber-50 border border-pink-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#5D4037]">
                  Status: {isPlaying ? 'Playing Ambient Harmony' : 'Music Paused'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isPlaying ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                }`}>
                  {isPlaying ? 'ACTIVE' : 'OFF'}
                </span>
              </div>

              {/* Volume Slider & Controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#6D4C41]">
                  <span className="flex items-center gap-1 font-semibold">
                    <Sliders className="w-3.5 h-3.5" />
                    Volume Control:
                  </span>
                  <span className="font-mono font-bold">
                    {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMute}
                    className="p-1.5 rounded-lg hover:bg-pink-100 text-[#BE185D] transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-500" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-[#BE185D] h-1.5 bg-pink-100 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Big Action Button */}
              <button
                type="button"
                onClick={onTogglePlay}
                className={`mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isPlaying
                    ? 'bg-[#3E2723] hover:bg-[#2C1810] text-white'
                    : 'bg-[#BE185D] hover:bg-[#9D174D] text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause Background Music</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Focus Music for Studying</span>
                  </>
                )}
              </button>

              <p className="mt-2 text-[10px] text-center text-[#8D6E63] italic">
                Relaxing peaceful acoustic harmonics for browsing & ordering cakes
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
