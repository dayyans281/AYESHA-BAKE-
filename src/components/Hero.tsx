import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, ArrowRight, Heart, Star, Award, CheckCircle } from 'lucide-react';
import heroCakeImg from '../assets/images/hero_cake_1789205695116.jpg';
import fruitCocktailCakeImg from '../assets/images/fruit_cocktail_cake_1789206671946.jpg';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';
import { useCustomPhotos } from '../utils/customPhotoStore';

interface HeroProps {
  onOrderNowClick: () => void;
  onExploreMenuClick: () => void;
  onOpenAiAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderNowClick,
  onExploreMenuClick,
  onOpenAiAdvisor,
}) => {
  const { photos } = useCustomPhotos();
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#FFFDF9] pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FCE7F3]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FED7AA]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE7F3] border border-[#F472B6]/30 text-[#9D174D] text-xs sm:text-sm font-bold mb-5 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#DB2777]" />
              <span>AYESHA BAKING HOUSE • Baked with Love, Made for You</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#3E2723] tracking-tight leading-[1.15]"
            >
              Sweet Moments <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DB2777] via-[#BE185D] to-[#9D174D]">
                Start Here
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-[#5D4037] leading-relaxed max-w-2xl font-normal"
            >
              Delicious cakes, cupcakes, cookies and desserts freshly baked with love by{' '}
              <strong className="text-[#3E2723] font-bold">AYESHA BAKING HOUSE</strong>. From custom 3D
              birthday cakes to royal Rasmalai fusions and gooey chocolate fudge.
            </motion.p>

            {/* Tagline Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#831843]"
            >
              <Heart className="w-4 h-4 fill-[#F43F5E] text-[#F43F5E]" />
              <span>ALL DESIGN CAKE PROVIDE — Every shape, theme, and celebration!</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                id="btn-hero-order-now"
                onClick={onOrderNowClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#DB2777] via-[#BE185D] to-[#9D174D] hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-explore-menu"
                onClick={onExploreMenuClick}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base text-[#4E342E] bg-white border-2 border-[#EAD7CD] hover:border-[#BE185D] hover:text-[#BE185D] shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Menu</span>
              </button>

              <button
                id="btn-hero-ai-advisor"
                onClick={onOpenAiAdvisor}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm text-[#831843] bg-[#FCE7F3]/70 hover:bg-[#FCE7F3] border border-[#F472B6]/40 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#DB2777]" />
                <span>AI Custom Cake Advisor</span>
              </button>
            </motion.div>

            {/* WhatsApp Quick Hotline Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-[#EFE3DB] w-full flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#15803D]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#6E4F42] uppercase tracking-wide">
                    Direct WhatsApp Hotline
                  </p>
                  <a
                    href={createWhatsAppUrl("Hello Ayesha Baking House! I want to order a freshly baked cake.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-extrabold text-[#1B4D3E] hover:underline hover:text-[#15803D] flex items-center gap-1.5"
                  >
                    <span>{WHATSAPP_NUMBER}</span>
                    <span className="text-xs font-normal text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Online for Orders
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-[#5D4037]">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#3E2723]">4.9 / 5.0</span>
                  <span className="text-[#8D6E63]">(100+ Reviews)</span>
                </div>
                <span className="text-[#D7CCC8]">•</span>
                <div className="flex items-center gap-1 text-[#BE185D] font-semibold">
                  <Award className="w-4 h-4" />
                  <span>100% Fresh Daily</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Cake Showcase with Floating Bakery Elements */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FCE7F3] via-[#FED7AA] to-[#FCE7F3] rounded-[2.5rem] -rotate-3 scale-95 opacity-60 filter blur-xl" />

            {/* Main Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 w-full max-w-md rounded-[2.5rem] p-3 sm:p-4 bg-white/90 backdrop-blur-sm shadow-2xl border border-white/80"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-square bg-[#FDF2F8]">
                <img
                  src={heroCakeImg}
                  alt="Ayesha Bake House Artisanal Cake"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Cake Info Badge at bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/30 backdrop-blur-md text-white mb-1">
                    Freshly Baked Today
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight drop-shadow">
                    Pastel Signature Dream Cake
                  </h3>
                  <p className="text-xs text-rose-100 font-medium drop-shadow">
                    Piped with pure whipped buttercream & fresh strawberries
                  </p>
                </div>
              </div>

              {/* Floating Bakery Element 1: 3D Car Cake Badge (Top Right) */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-2.5 z-20 max-w-[210px]"
              >
                <img
                  src={photos.carCake}
                  alt="3D yellow car cake"
                  className="w-11 h-11 rounded-xl object-cover border border-amber-300 shadow-xs shrink-0"
                />
                <div>
                  <p className="text-[10px] font-bold text-[#BE185D] uppercase leading-tight">Client Special</p>
                  <p className="text-xs font-bold text-[#3E2723] leading-snug">3D Yellow Car Cake</p>
                </div>
              </motion.div>

              {/* Floating Bakery Element 2: Sonic & Dinosaurs Tag (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -left-3 sm:-left-8 bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-2.5 z-20 max-w-[220px]"
              >
                <img
                  src={photos.sonicCake}
                  alt="Sonic theme cake"
                  className="w-11 h-11 rounded-xl object-cover border border-sky-300 shadow-xs shrink-0"
                />
                <div>
                  <p className="text-[10px] font-bold text-[#0284C7] uppercase leading-tight">Kids Celebration</p>
                  <p className="text-xs font-bold text-[#3E2723] leading-snug">Sonic & Dinosaurs</p>
                </div>
              </motion.div>

              {/* Floating Bakery Element 3: Rate List Feature (Middle Right) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="hidden sm:flex absolute top-1/2 -right-12 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-rose-100 items-center gap-2 z-20"
              >
                <img
                  src={fruitCocktailCakeImg}
                  alt="Fruit cocktail cake"
                  className="w-9 h-9 rounded-lg object-cover border border-pink-200"
                />
                <div className="pr-1">
                  <p className="text-[9px] font-bold text-[#BE185D] uppercase leading-none">Fresh Fruit</p>
                  <p className="text-[11px] font-bold text-[#3E2723]">Rate Card Special</p>
                </div>
              </motion.div>

              {/* Floating Sparkle / Decorative Icon */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-400 flex items-center justify-center shadow-md text-white text-xs font-bold"
              >
                ✨
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
