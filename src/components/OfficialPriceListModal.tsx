import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MessageCircle, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { MENU_ITEMS, WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';
import { MenuItem } from '../types';

// Real cake images from the poster borders
import redVelvetCakeImg from '../assets/images/red_velvet_cake_1789206690900.jpg';
import fruitCocktailCakeImg from '../assets/images/fruit_cocktail_cake_1789206671946.jpg';
import mangoGlazeCakeImg from '../assets/images/mango_glaze_cake_1789206710719.jpg';
import fudgeCakeImg from '../assets/images/fudge_cake_1789205773641.jpg';

interface OfficialPriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomizeItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const OfficialPriceListModal: React.FC<OfficialPriceListModalProps> = ({
  isOpen,
  onClose,
  onCustomizeItem,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  const priceTable = [
    { name: 'Vanilla Cake', price: 'Rs. 1000', per: 'per lb', id: 'vanilla-cake', tag: 'Classic Favorite' },
    { name: 'Strawberry Cake', price: 'Rs. 1000', per: 'per lb', id: 'strawberry-cake', tag: 'Fresh Berry' },
    { name: 'Caramel Crunch Cake', price: 'Rs. 1000', per: 'per lb', id: 'caramel-crunch-cake', tag: 'Salted Caramel' },
    { name: 'Pistachio Cake', price: 'Rs. 1200', per: 'per lb', id: 'pistachio-cake', tag: 'Roasted Pista' },
    { name: 'Pineapple Cake', price: 'Rs. 1200', per: 'per lb', id: 'pineapple-cake', tag: 'Juicy Tropical' },
    { name: 'Chocolate Cake', price: 'Rs. 1300', per: 'per lb', id: 'chocolate-cake', tag: 'Rich Cocoa' },
    { name: 'Rasmalai Cake', price: 'Rs. 1500', per: 'per lb', id: 'rasmalai-cake', tag: 'Royal Fusion ★' },
    { name: 'Chocolate Fudge Cake', price: 'Rs. 1500', per: 'per lb', id: 'chocolate-fudge-cake', tag: 'Decadent Ganache' },
    { name: 'Butter Cream Cake', price: 'Rs. 2000', per: 'per lb', id: 'butter-cream-cake', tag: 'Pure Butter' },
    { name: 'Pastry Per Piece (Vanilla + Butter)', price: 'Rs. 130', per: 'per slice', id: 'pastry-vanilla-butter', tag: 'Tea Time' },
    { name: 'Pastry Per Piece (Chocolate)', price: 'Rs. 150', per: 'per slice', id: 'pastry-chocolate', tag: 'Cocoa Slice' },
    { name: 'Brownies', price: 'Rs. 170', per: 'per piece', id: 'brownies', tag: 'Chewy Fudge' },
  ];

  const handleOrderWhatsAppList = () => {
    const text = `Hello Chef Ayesha! I am viewing your official *Ayesha Baking House Price List* and would like to order:
- WhatsApp: ${WHATSAPP_NUMBER}
Please guide me with booking availability.`;
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FDF4F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-4 border-[#FCE7F3] relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-[#3E2723] hover:bg-rose-100 flex items-center justify-center shadow transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Official Banner Header Styled Exactly Like Uploaded Poster */}
          <div className="relative pt-8 pb-6 px-6 text-center bg-gradient-to-r from-[#FDE2E4] via-[#FFF1F2] to-[#E2E8F0] border-b border-[#F0D0D5] overflow-hidden">
            {/* Corner Decorative Cake Badges */}
            <div className="absolute -top-3 -left-3 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md hidden sm:block opacity-90">
              <img src={redVelvetCakeImg} alt="Red velvet cake" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md hidden sm:block opacity-90">
              <img src={fruitCocktailCakeImg} alt="Fruit cocktail cake" className="w-full h-full object-cover" />
            </div>

            <div className="inline-block px-5 py-1 rounded-full bg-white/90 shadow-xs border border-[#F472B6]/40 text-[#BE185D] text-xs font-bold uppercase tracking-wider mb-2">
              ✨ Official Bakery Rate Card
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#581C87] tracking-tight drop-shadow-xs">
              Ayesha <span className="text-[#BE185D]">Baking House</span>
            </h2>

            {/* Magenta Ribbon */}
            <div className="mt-3 inline-block bg-gradient-to-r from-[#BE185D] via-[#9D174D] to-[#831843] text-white px-8 py-1.5 rounded-full font-serif font-bold text-sm sm:text-base tracking-wide shadow-md transform -rotate-1">
              Price List of Cakes
            </div>

            <p className="mt-2 text-xs text-[#5D4037]">
              “Baked with Love, Made for You” • Contact: <strong className="text-[#3E2723]">{WHATSAPP_NUMBER}</strong>
            </p>
          </div>

          {/* Poster Cakes Showcase Row */}
          <div className="bg-amber-50/50 py-3 px-4 border-b border-[#EED9CE] flex items-center justify-around gap-2 overflow-x-auto text-[11px] text-[#5D4037]">
            <div className="flex items-center gap-2 shrink-0">
              <img src={redVelvetCakeImg} alt="Red velvet" className="w-8 h-8 rounded-full object-cover border border-[#F472B6]" />
              <span className="font-semibold">Red Velvet</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <img src={fruitCocktailCakeImg} alt="Fruit cocktail" className="w-8 h-8 rounded-full object-cover border border-[#F472B6]" />
              <span className="font-semibold">Fresh Fruit Cocktail</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <img src={mangoGlazeCakeImg} alt="Mango cake" className="w-8 h-8 rounded-full object-cover border border-[#F472B6]" />
              <span className="font-semibold">Mango Mirror Glaze</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <img src={fudgeCakeImg} alt="Fudge cake" className="w-8 h-8 rounded-full object-cover border border-[#F472B6]" />
              <span className="font-semibold">Belgian Fudge</span>
            </div>
          </div>

          {/* Authentic Price Table Content */}
          <div className="p-4 sm:p-6 max-h-[55vh] overflow-y-auto">
            <div className="rounded-2xl border-2 border-[#1E40AF]/30 overflow-hidden shadow-sm">
              {/* Table Header like in image */}
              <div className="grid grid-cols-12 text-white font-bold text-xs sm:text-sm">
                <div className="col-span-8 sm:col-span-8 bg-[#0284C7] py-2.5 px-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-200" />
                  <span>Items</span>
                </div>
                <div className="col-span-4 sm:col-span-4 bg-[#581C87] py-2.5 px-4 text-right">
                  <span>Price</span>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#E2E8F0] bg-white">
                {priceTable.map((row, idx) => {
                  const matchedMenuItem = MENU_ITEMS.find((m) => m.id === row.id) || MENU_ITEMS[0];

                  return (
                    <div
                      key={row.name}
                      className={`grid grid-cols-12 items-center px-4 py-3 text-xs sm:text-sm transition-colors hover:bg-pink-50/50 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF5EE]/40'
                      }`}
                    >
                      <div className="col-span-8 sm:col-span-8 pr-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#BE185D] shrink-0" />
                          <span className="font-bold text-[#3E2723]">{row.name}</span>
                        </div>
                        <span className="text-[10px] text-[#8D6E63] italic sm:mr-3">
                          {row.tag}
                        </span>
                      </div>

                      <div className="col-span-4 sm:col-span-4 flex items-center justify-end gap-2">
                        <div className="text-right">
                          <span className="font-black text-[#1E3A8A] text-sm sm:text-base">
                            {row.price}
                          </span>
                          <span className="text-[10px] text-gray-500 block leading-none">
                            {row.per}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onCustomizeItem(matchedMenuItem);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#BE185D] text-white hover:bg-[#9D174D] shadow-xs"
                          title="Customize & Order"
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-[#FCE7F3]/70 border border-[#F472B6]/40 flex items-center gap-3 text-xs text-[#831843]">
              <ShieldCheck className="w-5 h-5 text-[#BE185D] shrink-0" />
              <span>
                <strong>ALL DESIGN CAKE PROVIDE:</strong> For 3D sculpted car cakes, cartoon theme cakes, photo cakes, or wedding tiers, custom pricing applies. We provide exact estimates on WhatsApp!
              </span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#F0DFD5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#5D4037] text-center sm:text-left">
              Direct Booking Line: <strong className="text-[#3E2723]">{WHATSAPP_NUMBER}</strong>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold text-[#5D4037] hover:bg-gray-100 border border-gray-200"
              >
                Close Rate Card
              </button>

              <button
                onClick={handleOrderWhatsAppList}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-[#15803D] hover:bg-[#166534] text-white flex items-center justify-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
