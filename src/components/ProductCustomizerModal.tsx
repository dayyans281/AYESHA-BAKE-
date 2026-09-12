import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Plus, Check, MessageCircle, Heart, ShieldCheck, Cake, Info } from 'lucide-react';
import { MenuItem, ProductCustomization } from '../types';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';

interface ProductCustomizerModalProps {
  isOpen: boolean;
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: ProductCustomization, quantity: number) => void;
}

const SPONGE_OPTIONS = [
  { id: 'vanilla', name: 'Classic Madagascar Vanilla Sponge', extraPrice: 0 },
  { id: 'chocolate', name: 'Rich Dutch Cocoa Chocolate Sponge', extraPrice: 0 },
  { id: 'red_velvet', name: 'Velvety Red Velvet Sponge', extraPrice: 100 },
  { id: 'saffron', name: 'Saffron & Cardamom Milk Sponge', extraPrice: 150 },
  { id: 'pistachio', name: 'Roasted Iranian Pistachio Sponge', extraPrice: 200 },
];

const FROSTING_OPTIONS = [
  { id: 'buttercream', name: 'Signature Swiss Buttercream' },
  { id: 'whipped_cream', name: 'Light Whipped Dairy Cream' },
  { id: 'ganache', name: 'Rich Belgian Chocolate Ganache' },
  { id: 'cream_cheese', name: 'Silky Cream Cheese Frosting' },
];

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  isOpen,
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isCake = item.category === 'cakes' || item.category === 'signature';
  const isCupcakesOrPastry = item.category === 'cupcakes' || item.category === 'pastries' || item.category === 'brownies';

  const [weightLbs, setWeightLbs] = useState<number>(item.defaultWeight || 2);
  const [pieceCount, setPieceCount] = useState<number>(item.category === 'cupcakes' ? 6 : 2);
  const [spongeFlavor, setSpongeFlavor] = useState<string>('Classic Madagascar Vanilla Sponge');
  const [frostingType, setFrostingType] = useState<string>('Signature Swiss Buttercream');
  const [sweetnessLevel, setSweetnessLevel] = useState<'Standard' | 'Mild / Less Sweet'>('Standard');
  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [cakeInscription, setCakeInscription] = useState<string>('');
  const [candlePack, setCandlePack] = useState<boolean>(true);
  const [sparklerCandle, setSparklerCandle] = useState<boolean>(false);
  const [giftBoxRibbon, setGiftBoxRibbon] = useState<boolean>(false);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Reset when item changes
  useEffect(() => {
    if (item) {
      setWeightLbs(item.defaultWeight || 2);
      setPieceCount(item.category === 'cupcakes' ? 6 : 2);
      setSpongeFlavor(
        item.id.includes('chocolate')
          ? 'Rich Dutch Cocoa Chocolate Sponge'
          : item.id.includes('rasmalai')
          ? 'Saffron & Cardamom Milk Sponge'
          : item.id.includes('pistachio')
          ? 'Roasted Iranian Pistachio Sponge'
          : 'Classic Madagascar Vanilla Sponge'
      );
      setFrostingType(
        item.id.includes('fudge')
          ? 'Rich Belgian Chocolate Ganache'
          : 'Signature Swiss Buttercream'
      );
      setCakeInscription('');
      setSpecialNotes('');
      setQuantity(1);
    }
  }, [item]);

  // Price Calculation
  const calculateTotal = () => {
    let base = 0;
    if (isCake) {
      base = item.price * weightLbs;
    } else if (item.category === 'cupcakes') {
      base = (item.price / 6) * pieceCount;
    } else {
      base = item.price * pieceCount;
    }

    // Addons
    if (isEggless) base += 100 * (isCake ? weightLbs : 1);
    if (sparklerCandle) base += 150;
    if (giftBoxRibbon) base += 200;

    return Math.round(base * quantity);
  };

  const calculatedTotal = calculateTotal();

  const handleConfirmAdd = () => {
    const customization: ProductCustomization = {
      weightLbs: isCake ? weightLbs : undefined,
      pieceCount: !isCake ? pieceCount : undefined,
      spongeFlavor: isCake ? spongeFlavor : undefined,
      frostingType: isCake ? frostingType : undefined,
      sweetnessLevel,
      isEggless,
      cakeInscription: cakeInscription.trim() || undefined,
      candlePack,
      sparklerCandle,
      giftBoxRibbon,
      specialNotes: specialNotes.trim() || undefined,
    };

    onAddToCart(item, customization, quantity);
    onClose();
  };

  const handleInstantWhatsApp = () => {
    let msg = `*CUSTOM ORDER INQUIRY - AYESHA BAKE HOUSE*\n`;
    msg += `------------------------------------\n`;
    msg += `*Item:* ${item.name}\n`;
    if (isCake) {
      msg += `*Weight / Size:* ${weightLbs} lbs (${weightLbs * 4}-${weightLbs * 6} servings)\n`;
      msg += `*Sponge Flavor:* ${spongeFlavor}\n`;
      msg += `*Frosting:* ${frostingType}\n`;
    } else {
      msg += `*Quantity / Pieces:* ${pieceCount} pcs\n`;
    }
    msg += `*Sweetness Level:* ${sweetnessLevel}\n`;
    if (isEggless) msg += `*Eggless (100% Veg):* Yes (+Rs. 100/lb)\n`;
    if (cakeInscription) msg += `*Piped Message on Cake:* "${cakeInscription}"\n`;
    if (sparklerCandle) msg += `*Add-on:* Golden Sparkler Candle (+Rs. 150)\n`;
    if (giftBoxRibbon) msg += `*Add-on:* Luxury Gift Ribbon Box (+Rs. 200)\n`;
    if (specialNotes) msg += `*Special Request:* ${specialNotes}\n`;
    msg += `------------------------------------\n`;
    msg += `*ESTIMATED TOTAL:* Rs. ${calculatedTotal}\n\n`;
    msg += `Hello Chef Ayesha! I would like to order this custom cake with the above specifications. Please confirm availability!`;

    window.open(createWhatsAppUrl(msg), '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#F5E6DF] my-6 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#4E342E] via-[#3E2723] to-[#2D1810] text-white flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FCE7F3] flex items-center justify-center text-[#BE185D]">
              <Cake className="w-4 h-4 text-[#BE185D]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                Customize Your Fresh Bake
              </h3>
              <p className="text-[11px] text-rose-200">
                Tailor flavors, weight, sweetness & personalized message
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-rose-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-[#FFFDF9]">
          
          {/* Item Preview Card */}
          <div className="flex gap-4 p-4 rounded-2xl bg-white border border-[#EFE3DB] shadow-2xs items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-[#F0DFD5]"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#BE185D]">
                Freshly Baked to Order
              </span>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#3E2723] truncate mt-1">
                {item.name}
              </h4>
              <p className="text-xs text-[#6E4F42] line-clamp-2 mt-0.5">
                {item.description}
              </p>
              <div className="mt-2 text-xs font-bold text-[#BE185D]">
                Base Price: Rs. {item.price} <span className="font-normal text-[#8D6E63]">{item.unitText}</span>
              </div>
            </div>
          </div>

          {/* 1. Size / Weight Selection */}
          {isCake ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4E342E] flex items-center gap-1.5">
                  <span>1. Select Cake Size & Weight</span>
                  <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs text-[#BE185D] font-bold">
                  {weightLbs} lb{weightLbs > 1 ? 's' : ''} (Rs. {item.price * weightLbs})
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[1, 2, 3, 4].map((wt) => {
                  const servings = wt === 1 ? '4-6 guests' : wt === 2 ? '8-12 guests' : wt === 3 ? '15-20 guests' : '20-28 guests';
                  const isSelected = weightLbs === wt;
                  return (
                    <button
                      key={wt}
                      type="button"
                      onClick={() => setWeightLbs(wt)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#FCE7F3] border-[#DB2777] shadow-xs'
                          : 'bg-white border-[#E8D8CF] hover:bg-[#FAF5EE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${isSelected ? 'text-[#9D174D]' : 'text-[#3E2723]'}`}>
                          {wt} Pound{wt > 1 ? 's' : ''}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#BE185D]" />}
                      </div>
                      <span className="text-[11px] text-[#8D6E63] block mt-0.5">
                        {servings}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4E342E]">
                1. Select Portion / Piece Count
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(item.category === 'cupcakes' ? [6, 12, 18, 24] : [2, 4, 6, 12]).map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setPieceCount(qty)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      pieceCount === qty
                        ? 'bg-[#FCE7F3] border-[#DB2777] text-[#9D174D]'
                        : 'bg-white border-[#E8D8CF] text-[#5D4037] hover:bg-[#FAF5EE]'
                    }`}
                  >
                    {qty} Pieces
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Sponge Flavor & Frosting (For Cakes) */}
          {isCake && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4E342E]">
                  2. Sponge Base Flavor
                </label>
                <select
                  value={spongeFlavor}
                  onChange={(e) => setSpongeFlavor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs font-semibold text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                >
                  {SPONGE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4E342E]">
                  3. Frosting Style
                </label>
                <select
                  value={frostingType}
                  onChange={(e) => setFrostingType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs font-semibold text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                >
                  {FROSTING_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* 3. Dietary & Sweetness Preferences */}
          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F2DDD2] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4E342E] block">
              Taste & Dietary Customization
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Sweetness */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#EFE3DB]">
                <div>
                  <span className="text-xs font-bold text-[#3E2723] block">Sweetness Level</span>
                  <span className="text-[10px] text-[#8D6E63]">Choose your sugar preference</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setSweetnessLevel('Standard')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      sweetnessLevel === 'Standard'
                        ? 'bg-[#3E2723] text-white'
                        : 'bg-[#FAF5EE] text-[#5D4037]'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setSweetnessLevel('Mild / Less Sweet')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      sweetnessLevel === 'Mild / Less Sweet'
                        ? 'bg-[#BE185D] text-white'
                        : 'bg-[#FAF5EE] text-[#5D4037]'
                    }`}
                  >
                    Mild Sweet
                  </button>
                </div>
              </div>

              {/* Eggless Option */}
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#EFE3DB] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#3E2723] block">100% Eggless Sponge</span>
                  <span className="text-[10px] text-[#8D6E63]">+Rs. 100/lb (Pure Veg)</span>
                </div>
                <input
                  type="checkbox"
                  checked={isEggless}
                  onChange={(e) => setIsEggless(e.target.checked)}
                  className="w-4 h-4 text-[#BE185D] rounded focus:ring-[#BE185D]"
                />
              </label>
            </div>
          </div>

          {/* 4. Cake Inscription / Piped Message */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4E342E]">
                Personalized Inscription on Cake / Board
              </label>
              <span className="text-[10px] text-[#8D6E63]">Complimentary hand-piped</span>
            </div>
            <input
              type="text"
              value={cakeInscription}
              onChange={(e) => setCakeInscription(e.target.value)}
              placeholder='e.g. "Happy 5th Birthday Dayyan!" or "Happy Anniversary Mama & Baba"'
              maxLength={60}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
            />
          </div>

          {/* 5. Celebration Add-ons */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4E342E]">
              Party & Gift Add-ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EFE3DB] cursor-pointer">
                <input
                  type="checkbox"
                  checked={candlePack}
                  onChange={(e) => setCandlePack(e.target.checked)}
                  className="w-4 h-4 text-[#BE185D] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#3E2723] block">Candle Pack</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">FREE Included</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EFE3DB] cursor-pointer">
                <input
                  type="checkbox"
                  checked={sparklerCandle}
                  onChange={(e) => setSparklerCandle(e.target.checked)}
                  className="w-4 h-4 text-[#BE185D] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#3E2723] block">Sparkler Candle</span>
                  <span className="text-[10px] text-[#BE185D] font-bold">+Rs. 150</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#EFE3DB] cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftBoxRibbon}
                  onChange={(e) => setGiftBoxRibbon(e.target.checked)}
                  className="w-4 h-4 text-[#BE185D] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#3E2723] block">Luxury Gift Ribbon</span>
                  <span className="text-[10px] text-[#BE185D] font-bold">+Rs. 200</span>
                </div>
              </label>
            </div>
          </div>

          {/* 6. Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4E342E]">
              Special Requests or Color Themes
            </label>
            <textarea
              rows={2}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Please use pastel blue rosettes, less food coloring, or allergy notice..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#E8D8CF] text-xs text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
            />
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-5 py-4 bg-white border-t border-[#F0DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            {/* Quantity Controller */}
            <div className="flex items-center gap-2 border border-[#E8D8CF] rounded-xl p-1 bg-[#FAF5EE]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-white text-[#3E2723] font-bold flex items-center justify-center hover:bg-[#FCE7F3]"
              >
                -
              </button>
              <span className="text-xs font-bold text-[#3E2723] w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg bg-white text-[#3E2723] font-bold flex items-center justify-center hover:bg-[#FCE7F3]"
              >
                +
              </button>
            </div>

            <div className="text-right sm:text-left">
              <span className="text-[10px] uppercase font-bold text-[#8D6E63] block">Calculated Total:</span>
              <span className="text-xl font-serif font-black text-[#BE185D]">
                Rs. {calculatedTotal}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleInstantWhatsApp}
              className="px-4 py-2.5 rounded-xl border border-[#86EFAC] bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#15803D] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              title="Order this directly via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              type="button"
              id="btn-add-customized-cart"
              onClick={handleConfirmAdd}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Order Bag</span>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
