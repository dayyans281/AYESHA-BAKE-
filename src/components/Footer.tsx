import React from 'react';
import { Cake, Heart, Phone, MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D1810] text-[#FFF8F0] pt-16 pb-12 border-t border-[#4E342E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4E342E]/70">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FCE7F3] via-[#FBCFE8] to-[#FED7AA] flex items-center justify-center shadow-inner text-[#BE185D]">
                <Cake className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-black tracking-tight text-white uppercase">
                  AYESHA BAKING HOUSE
                </span>
                <span className="text-xs font-medium text-[#F472B6] tracking-wider uppercase -mt-1 font-script text-lg">
                  Baked with Love, Made for You
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-rose-100/80 leading-relaxed max-w-sm">
              A lovingly created HOME bakery offering custom 3D celebration cakes, 
              authentic royal Rasmalai cakes, decadent chocolate fudge, pastries, and brownies.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#FDBA74]" />
              <span>ALL DESIGN CAKE PROVIDE</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FDBA74]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-100/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Our Kitchen</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Price List & Menu</a></li>
              <li><a href="#cakes" className="hover:text-white transition-colors">Custom Cake Studio</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Celebration Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact & Order</a></li>
            </ul>
          </div>

          {/* Col 3: Direct WhatsApp & Order Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FDBA74]">
              Order Hotline
            </h4>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#15803D] flex items-center justify-center text-white">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-300 font-bold uppercase">WhatsApp Direct</p>
                  <a
                    href={createWhatsAppUrl("Hello Ayesha Baking House! I would like to order a freshly baked cake.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-extrabold text-white hover:text-[#4ADE80] transition-colors"
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                </div>
              </div>

              <p className="text-xs text-rose-100/70">
                Send us your custom design photo anytime on WhatsApp for instant quote and booking!
              </p>
            </div>

            <p className="text-xs text-rose-100/60 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FDBA74]" />
              <span>Doorstep Delivery in Clean Insulated Cake Boxes</span>
            </p>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/60">
          <p>© {currentYear} AYESHA BAKING HOUSE. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Lovingly baked with</span>
            <Heart className="w-3.5 h-3.5 fill-[#F43F5E] text-[#F43F5E]" />
            <span>for your special celebrations</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
