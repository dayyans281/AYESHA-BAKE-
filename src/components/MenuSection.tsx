import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check, MessageCircle, Star, Sparkles, SlidersHorizontal, Eye, FileText, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, createWhatsAppUrl } from '../data/bakeryData';
import { MenuItem } from '../types';
import { OfficialPriceListModal } from './OfficialPriceListModal';

// Thumbnails for the rate card banner
import redVelvetCakeImg from '../assets/images/red_velvet_cake_1789206690900.jpg';
import fruitCocktailCakeImg from '../assets/images/fruit_cocktail_cake_1789206671946.jpg';
import mangoGlazeCakeImg from '../assets/images/mango_glaze_cake_1789206710719.jpg';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, weightLbs?: number, customMessage?: string) => void;
  onCustomizeItem: (item: MenuItem) => void;
  onOpenPhotoManager?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, onCustomizeItem, onOpenPhotoManager }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  const [isPriceListModalOpen, setIsPriceListModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'signature', label: 'Signature & Fusion' },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'pastries', label: 'Pastries' },
    { id: 'brownies', label: 'Brownies' },
  ];

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const getWeightForItem = (item: MenuItem) => {
    return selectedWeights[item.id] || item.defaultWeight || 2;
  };

  const handleWeightChange = (itemId: string, weight: number) => {
    setSelectedWeights((prev) => ({ ...prev, [itemId]: weight }));
  };

  const handleQuickAdd = (item: MenuItem) => {
    const weight = item.defaultWeight ? getWeightForItem(item) : undefined;
    onAddToCart(item, weight);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1800);
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF5EE]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Official Menu & Ordering
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] tracking-tight">
            Our Bakery <span className="text-[#BE185D]">Menu & Customizations</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037] leading-relaxed">
            Choose your favorites, personalize flavors, pounds, sweetness level, and complimentary piped celebration messages.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#BE185D] text-white shadow-md shadow-pink-600/25 scale-102'
                  : 'bg-white text-[#5D4037] hover:bg-[#FCE7F3] hover:text-[#BE185D] border border-[#EFE3DB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Official Price List Poster Callout Banner */}
        <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-r from-[#FFF1F2] via-white to-[#FDF2F8] border-2 border-[#FBCFE8] rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Overlapping Thumbnails from the poster */}
            <div className="flex -space-x-3 shrink-0">
              <img src={redVelvetCakeImg} alt="Red velvet" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs" />
              <img src={fruitCocktailCakeImg} alt="Fruit cocktail" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs" />
              <img src={mangoGlazeCakeImg} alt="Mango cake" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#BE185D] bg-[#FCE7F3] px-2 py-0.5 rounded-full">
                  Official Rate Card
                </span>
                <span className="text-xs font-semibold text-[#8D6E63]">Ayesha Baking House</span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#3E2723]">
                View Official Price List & Cakes Poster
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsPriceListModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#581C87] hover:bg-[#4A148C] text-white text-xs sm:text-sm font-bold shadow transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-purple-200" />
            <span>Open Price List Poster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Menu Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const currentWeight = getWeightForItem(item);
            const isCake = item.defaultWeight !== undefined;
            const finalPrice = isCake ? item.price * currentWeight : item.price;
            const isAdded = addedItemNotice === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden border border-[#F0DFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Item Image */}
                  <div
                    onClick={() => onCustomizeItem(item)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#FDF2F8] cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    {item.popular && (
                      <span className="absolute top-3 left-3 bg-[#DB2777] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white text-white" />
                        Popular
                      </span>
                    )}

                    {/* Customize Pill Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-[#BE185D] font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Customize Size & Flavor
                      </span>
                    </div>

                    {/* Base Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-black text-[#3E2723] shadow-sm">
                      Rs. {item.price} <span className="text-[10px] font-normal text-[#8D6E63]">{item.unitText}</span>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-5 sm:p-6">
                    <h3
                      onClick={() => onCustomizeItem(item)}
                      className="text-lg sm:text-xl font-serif font-bold text-[#3E2723] group-hover:text-[#BE185D] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#6E4F42] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Flavor Notes Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.flavorNotes.map((note, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium bg-[#FFF5EB] text-[#8C4A2F] px-2 py-0.5 rounded-md border border-[#FCE7D6]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Weight Selector for Cakes */}
                    {isCake && (
                      <div className="mt-4 pt-3 border-t border-[#F5E8E0]">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-semibold text-[#5D4037]">Quick Weight:</span>
                          <span className="text-[#BE185D] font-bold">
                            Rs. {finalPrice} ({currentWeight} lbs)
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((weight) => (
                            <button
                              key={weight}
                              type="button"
                              onClick={() => handleWeightChange(item.id, weight)}
                              className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                                currentWeight === weight
                                  ? 'bg-[#FCE7F3] border-[#DB2777] text-[#9D174D]'
                                  : 'bg-white border-[#EAD8CE] text-[#5D4037] hover:bg-[#FAF5EE]'
                              }`}
                            >
                              {weight} lb{weight > 1 ? 's' : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 sm:p-6 sm:pt-0 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* Customize Button */}
                    <button
                      type="button"
                      onClick={() => onCustomizeItem(item)}
                      className="flex-1 py-2 px-3 rounded-xl border border-[#BE185D] text-[#BE185D] hover:bg-[#FCE7F3] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Customize Options</span>
                    </button>

                    {/* Quick Add Button */}
                    <button
                      onClick={() => handleQuickAdd(item)}
                      className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                        isAdded
                          ? 'bg-[#15803D] text-white'
                          : 'bg-[#4E342E] hover:bg-[#3E2723] text-white active:scale-98'
                      }`}
                      title="Quick Add to Bag"
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      <span>{isAdded ? 'Added' : 'Quick Add'}</span>
                    </button>

                    {/* Direct WhatsApp Order for this cake */}
                    <a
                      href={createWhatsAppUrl(
                        `Hello Ayesha Bake House! I would like to order: ${item.name} (${
                          isCake ? `${currentWeight} lbs` : '1 portion'
                        }) - Total: Rs. ${finalPrice}. Please confirm availability.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] transition-colors border border-[#86EFAC]"
                      title="Order direct via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Special Menu Footer Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FFF1F2] via-[#FDF2F8] to-[#FFF7ED] border border-[#F472B6]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#3E2723]">
              Need a 3D Theme Cake or Grand Wedding Tier?
            </h4>
            <p className="mt-1 text-sm text-[#5D4037]">
              Our specialty is 100% customized cakes: 3D cars, cartoon characters, sugar flowers, and multi-tier celebrations!
            </p>
          </div>
          <a
            href={createWhatsAppUrl("Hello Ayesha Bake House! I would like to order a customized theme cake or special size.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl font-bold text-sm text-white bg-[#BE185D] hover:bg-[#9D174D] shadow-md transition-all whitespace-nowrap flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Chef Ayesha</span>
          </a>
        </div>

      </div>

      {/* Official Rate Card Poster Modal */}
      <OfficialPriceListModal
        isOpen={isPriceListModalOpen}
        onClose={() => setIsPriceListModalOpen(false)}
        onCustomizeItem={onCustomizeItem}
        onQuickAdd={onAddToCart}
        onOpenPhotoManager={onOpenPhotoManager}
      />
    </section>
  );
};
