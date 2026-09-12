import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Music, Heart, Volume2, ArrowRight, Cake, Check, ShieldCheck } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/bakeryData';

// Showcase thumbnails
import carCakeImg from '../assets/images/car_cake_1789205714144.jpg';
import sonicCakeImg from '../assets/images/sonic_cake_1789205755342.jpg';
import fruitCocktailCakeImg from '../assets/images/fruit_cocktail_cake_1789206671946.jpg';
import redVelvetCakeImg from '../assets/images/red_velvet_cake_1789206690900.jpg';

interface WelcomeSplashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterWithMusic: () => void;
  onEnterSilent: () => void;
}

export const WelcomeSplashModal: React.FC<WelcomeSplashModalProps> = ({
  isOpen,
  onClose,
  onEnterWithMusic,
  onEnterSilent,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger a soft celebratory confetti burst on launch
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#BE185D', '#F472B6', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const musicTrackTitle = 'Focus Music for Work and Studying, Background Music for Concentration, Study Music';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF5F7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-4 border-[#FBCFE8] relative text-center"
        >
          {/* Top Decorative Colorful Ribbon Bar */}
          <div className="h-3 w-full bg-gradient-to-r from-[#F43F5E] via-[#FB923C] via-[#FBBF24] via-[#34D399] via-[#38BDF8] via-[#818CF8] to-[#EC4899] animate-pulse" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/90 text-[#5D4037] hover:bg-rose-100 flex items-center justify-center shadow-md transition-colors"
            title="Close Welcome"
          >
            ✕
          </button>

          <div className="px-5 py-8 sm:px-10 sm:py-10">
            {/* Sparkle Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 via-amber-100 to-sky-100 border border-pink-200 shadow-xs mb-4">
              <Sparkles className="w-4 h-4 text-[#BE185D] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-black uppercase tracking-wider text-[#831843]">
                Baked with Love, Made for You
              </span>
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            </div>

            {/* COLORFUL "WELCOME TO AYESHA BAKE" HEADING */}
            <div className="my-2">
              <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight uppercase drop-shadow-sm">
                <span className="bg-gradient-to-r from-[#E11D48] via-[#EA580C] to-[#D97706] bg-clip-text text-transparent">
                  WELCOME
                </span>{' '}
                <span className="bg-gradient-to-r from-[#0284C7] via-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  TO
                </span>{' '}
                <span className="bg-gradient-to-r from-[#BE185D] via-[#DB2777] via-[#9333EA] to-[#4F46E5] bg-clip-text text-transparent underline decoration-[#F472B6] decoration-wavy decoration-2">
                  AYESHA BAKE
                </span>
              </h1>
            </div>

            {/* Sub-banner promise */}
            <p className="mt-2 text-sm sm:text-base font-semibold text-[#5D4037]">
              Premium Handcrafted Cakes, 3D Party Creations & Gourmet Desserts
            </p>

            <div className="mt-1 inline-block text-xs font-bold text-[#BE185D] bg-[#FCE7F3] px-3 py-1 rounded-full">
              ★ ALL DESIGN CAKE PROVIDE ★
            </div>

            {/* Real Cake Showcase Row */}
            <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 p-3 rounded-2xl bg-gradient-to-r from-pink-50/70 via-amber-50/70 to-rose-50/70 border border-pink-100">
              <div className="flex flex-col items-center">
                <img
                  src={carCakeImg}
                  alt="3D Car cake"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-amber-300 shadow-xs hover:scale-105 transition-transform"
                />
                <span className="text-[10px] font-bold text-[#3E2723] mt-1 text-center line-clamp-1">
                  3D Car Cake
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={sonicCakeImg}
                  alt="Sonic birthday cake"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-sky-300 shadow-xs hover:scale-105 transition-transform"
                />
                <span className="text-[10px] font-bold text-[#3E2723] mt-1 text-center line-clamp-1">
                  Sonic Theme
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={fruitCocktailCakeImg}
                  alt="Fruit cocktail cake"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-emerald-300 shadow-xs hover:scale-105 transition-transform"
                />
                <span className="text-[10px] font-bold text-[#3E2723] mt-1 text-center line-clamp-1">
                  Fruit Cocktail
                </span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={redVelvetCakeImg}
                  alt="Red velvet cake"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-rose-300 shadow-xs hover:scale-105 transition-transform"
                />
                <span className="text-[10px] font-bold text-[#3E2723] mt-1 text-center line-clamp-1">
                  Red Velvet
                </span>
              </div>
            </div>

            {/* Background Music Announcement Card */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#FDF2F8] via-[#FFF1F2] to-[#FAF5FF] border-2 border-[#F472B6]/60 text-left relative overflow-hidden shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BE185D] to-[#831843] flex items-center justify-center text-white shrink-0 shadow-sm animate-bounce">
                  <Music className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#BE185D] flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-[#BE185D]" />
                      Background Soundscape
                    </span>
                    <span className="text-[10px] font-bold bg-pink-200 text-pink-900 px-2 py-0.5 rounded-full">
                      Study & Focus Tone
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#2C1810] mt-0.5 leading-snug">
                    {musicTrackTitle}
                  </h3>
                  <p className="text-[11px] text-[#6D4C41] mt-1 leading-relaxed">
                    Peaceful, gentle ambient acoustic keys tuned to enhance concentration and relaxation while you browse custom cakes.
                  </p>
                </div>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onEnterWithMusic}
                className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#BE185D] via-[#D946EF] to-[#8B5CF6] hover:from-[#9D174D] hover:to-[#7C3AED] shadow-lg hover:shadow-xl hover:scale-102 transition-all flex items-center justify-center gap-2.5"
              >
                <Music className="w-5 h-5 fill-white" />
                <span>Enter Ayesha Bake & Play Music</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>

              <button
                type="button"
                onClick={onEnterSilent}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl font-semibold text-xs sm:text-sm text-[#5D4037] hover:bg-gray-100 border border-gray-300 transition-colors"
              >
                Enter Silently
              </button>
            </div>

            {/* WhatsApp Booking footer reassurance */}
            <p className="mt-4 text-[11px] text-[#8D6E63] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct WhatsApp Line: <strong className="text-[#3E2723]">{WHATSAPP_NUMBER}</strong></span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
