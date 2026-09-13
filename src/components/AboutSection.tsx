import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, CheckCircle2, Phone, UtensilsCrossed } from 'lucide-react';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';
import { useCustomPhotos } from '../utils/customPhotoStore';
import { ScrollReveal, ScrollStaggerContainer, ScrollStaggerItem } from './ScrollReveal';

interface AboutSectionProps {
  onCustomCakeClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onCustomCakeClick }) => {
  const { photos } = useCustomPhotos();
  const highlights = [
    {
      title: 'ALL DESIGN CAKE PROVIDE',
      desc: 'Got a picture on Pinterest or your child’s favorite cartoon? Send it to us on WhatsApp! We handcraft 3D sculpted car cakes, superhero & princess themes, floral tiers, and photo cakes.',
    },
    {
      title: 'Lovingly Created Home Bakery',
      desc: 'AYESHA BAKE HOUSE started from a passion for bringing families together over wholesome, warm, freshly baked desserts that taste as extraordinary as they look.',
    },
    {
      title: '100% Fresh Pure Ingredients',
      desc: 'We never freeze or mass-produce. Every single sponge is whipped fresh on order with dairy butter, authentic cocoa, fresh cream, real strawberries, and premium saffron.',
    },
    {
      title: 'Fast WhatsApp Booking',
      desc: 'No complicated forms needed. Directly chat with our baker at 03442302526 to confirm size, flavor, inscription, and prompt doorstep delivery.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#BE185D]" />
            Our Story & Craft
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] tracking-tight">
            Welcome to <span className="text-[#BE185D]">AYESHA BAKING HOUSE</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5D4037] leading-relaxed">
            <strong className="text-[#3E2723] font-semibold">“Baked with Love, Made for You”</strong> — 
            AYESHA BAKING HOUSE is a lovingly created HOME bakery where every sweet dream comes to life. 
            From joyful birthday milestones to grand family celebrations and intimate tea-time cravings, 
            we pour love, precision, and the finest ingredients into every creation.
          </p>
          
          {/* Prominent Banner for "ALL DESIGN CAKE PROVIDE" */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FFF1F2] via-[#FDF2F8] to-[#FFF7ED] border border-[#F472B6]/40 shadow-sm text-[#9D174D]">
            <Sparkles className="w-5 h-5 text-[#DB2777]" />
            <span className="font-extrabold text-sm sm:text-base tracking-wide">
              ALL DESIGN CAKE PROVIDE
            </span>
            <span className="text-xs sm:text-sm text-[#701A75] font-medium">
              — Bring us ANY picture or theme, and we will bake it for you!
            </span>
          </div>
        </ScrollReveal>

        {/* Two Showcase Feature Cards with Real Ayesha Bake House Custom Cakes */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Showcase 1: Custom Yellow Car Cake */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6DF] shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#FEF3C7] mb-6">
              <img
                src={photos.carCake}
                alt="Handcrafted 3D Car Birthday Cake by Ayesha Baking House"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#BE185D] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Customer Favorite 3D Design
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-lg">
                Sculpted for Dayyan King
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3E2723]">
              Handcrafted 3D Sculpted Theme Cakes
            </h3>
            <p className="mt-2 text-sm text-[#5D4037] leading-relaxed">
              Every curve, rosette, and smile is piped with meticulous home-baker artistry. 
              Our 3D vehicle & character cakes feature fluffy sponge, light chocolate or vanilla filling, 
              and cheerful buttercream rosettes that make kids’ eyes sparkle!
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs bg-[#FEF3C7] text-[#92400E] font-semibold px-2.5 py-1 rounded-md">
                Buttercream Rosettes
              </span>
              <span className="text-xs bg-[#FCE7F3] text-[#9D174D] font-semibold px-2.5 py-1 rounded-md">
                Custom Shapes
              </span>
              <span className="text-xs bg-[#E0F2FE] text-[#0369A1] font-semibold px-2.5 py-1 rounded-md">
                100% Edible Cake Base
              </span>
            </div>
          </motion.div>

          {/* Showcase 2: Sonic & Dinosaur Celebration Cake */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6DF] shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E0F2FE] mb-6">
              <img
                src={photos.sonicCake}
                alt="Sonic the Hedgehog & Dinosaurs Custom Birthday Cake by Ayesha Baking House"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0284C7] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Kids Party Special
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-lg">
                Custom Toppers & 2-Tier
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3E2723]">
              Cartoon, Gaming & Fantasy Celebrations
            </h3>
            <p className="mt-2 text-sm text-[#5D4037] leading-relaxed">
              Whether your little one loves Sonic, Superheroes, Princesses, Barbie, or Dinosaurs, 
              we craft customized toppers, vibrant ruffled texture piping, and chocolate surprises 
              that turn any party into an unforgettable memory.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs bg-[#E0F2FE] text-[#0369A1] font-semibold px-2.5 py-1 rounded-md">
                Theme Character Toppers
              </span>
              <span className="text-xs bg-[#DCFCE7] text-[#15803D] font-semibold px-2.5 py-1 rounded-md">
                Dinosaur Cutouts
              </span>
              <span className="text-xs bg-[#F3E8FF] text-[#6B21A8] font-semibold px-2.5 py-1 rounded-md">
                Chocolate Pearl Spheres
              </span>
            </div>
          </motion.div>

        </div>

        {/* Highlights Grid */}
        <ScrollStaggerContainer staggerDelay={0.12} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <ScrollStaggerItem
              key={idx}
              className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#F2DDD2] hover:border-[#BE185D]/40 transition-all hover:-translate-y-1 duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FCE7F3] flex items-center justify-center text-[#BE185D] mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#3E2723] font-serif">
                {item.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#6E4F42] leading-relaxed">
                {item.desc}
              </p>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

        {/* CTA Bar */}
        <ScrollReveal direction="up" delay={0.1} distance={20} className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onCustomCakeClick}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#DB2777] to-[#BE185D] hover:shadow-lg transition-all"
            >
              Customize Your Theme Cake
            </button>
            <a
              href={createWhatsAppUrl("Hello Ayesha Bake House! I have a custom cake picture/theme I want to discuss.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#1B4D3E] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#15803D]" />
              <span>Send Picture on WhatsApp ({WHATSAPP_NUMBER})</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
