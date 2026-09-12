import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, MessageCircle, Eye, Tag, Users, Cake, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { GALLERY_ITEMS, createWhatsAppUrl } from '../data/bakeryData';
import { GalleryItem, GalleryCategory, MenuItem } from '../types';

interface GallerySectionProps {
  onSelectForOrder?: (galleryItem: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectForOrder }) => {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filters: { id: GalleryCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Real Creations', count: GALLERY_ITEMS.length },
    { id: 'wedding', label: 'Wedding Cakes', count: GALLERY_ITEMS.filter((i) => i.category === 'wedding').length },
    { id: 'birthday', label: 'Birthday Cakes', count: GALLERY_ITEMS.filter((i) => i.category === 'birthday').length },
    { id: 'kids', label: '3D Sculpted & Kids', count: GALLERY_ITEMS.filter((i) => i.category === 'kids').length },
    { id: 'fusion', label: 'Signature & Fusion', count: GALLERY_ITEMS.filter((i) => i.category === 'fusion').length },
    { id: 'cupcakes', label: 'Cupcakes & Pastries', count: GALLERY_ITEMS.filter((i) => i.category === 'cupcakes').length },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-[#FAF5EE]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            100% Real Bakery Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] tracking-tight">
            Real Cake <span className="text-[#BE185D]">Masterpiece Gallery</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037] leading-relaxed">
            Every photo showcases real cakes baked and hand-decorated by AYESHA BAKE HOUSE. 
            From luxury wedding tiers and authentic Rasmalai to handcrafted 3D car shapes—our motto is 
            <strong className="text-[#BE185D]"> “ALL DESIGN CAKE PROVIDE”</strong>.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeFilter === f.id
                  ? 'bg-[#3E2723] text-white shadow-md scale-102'
                  : 'bg-white text-[#5D4037] hover:bg-[#FCE7F3] hover:text-[#BE185D] border border-[#E8D8CF]'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeFilter === f.id ? 'bg-[#BE185D] text-white' : 'bg-[#FAF5EE] text-[#8D6E63]'
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#F0DFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div
                onClick={() => setSelectedItem(item)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#FDF2F8] cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white font-semibold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Real Cake & Details
                  </span>
                </div>

                {/* Real Cake Tag */}
                <div className="absolute top-3 left-3 bg-[#BE185D] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{item.tag}</span>
                </div>

                {item.basePrice && (
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#3E2723] text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                    From Rs. {item.basePrice}
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3
                    onClick={() => setSelectedItem(item)}
                    className="text-base sm:text-lg font-serif font-bold text-[#3E2723] group-hover:text-[#BE185D] transition-colors leading-snug cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  
                  {item.servings && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8D6E63] font-medium">
                      <Users className="w-3.5 h-3.5 text-[#BE185D]" />
                      <span>{item.servings}</span>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-[#6E4F42] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Action Row */}
                <div className="mt-4 pt-3 border-t border-[#F5E6DF] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-xs font-bold text-[#BE185D] hover:underline flex items-center gap-1"
                  >
                    <span>View Cake</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={createWhatsAppUrl(`Hello Ayesha Bake House! I love your real cake design: "${item.title}". Can I order this customized for my event?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order Design</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#F5E6DF] max-h-[92vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#1A1A1A]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain object-center"
                />
                <div className="absolute bottom-3 left-3 bg-[#BE185D] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {selectedItem.tag}
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#BE185D] uppercase tracking-wider">
                      ALL DESIGN CAKE PROVIDE
                    </span>
                    {selectedItem.servings && (
                      <span className="text-xs text-[#8D6E63]">• {selectedItem.servings}</span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3E2723]">
                    {selectedItem.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.flavor && (
                  <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#EFE3DB] text-xs">
                    <strong className="text-[#3E2723] block mb-0.5">Flavor & Sponge Profile:</strong>
                    <span className="text-[#6E4F42]">{selectedItem.flavor}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#F5E6DF] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#3E2723]">Want this exact real design?</p>
                    <p className="text-[11px] text-[#8D6E63]">We personalize names, numbers, colors & sponge flavors!</p>
                  </div>

                  <a
                    href={createWhatsAppUrl(
                      `Hello Ayesha Bake House! I saw "${selectedItem.title}" in your Real Cake Gallery and would like to order this design.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#15803D] hover:bg-[#166534] shadow flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order This Cake on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
