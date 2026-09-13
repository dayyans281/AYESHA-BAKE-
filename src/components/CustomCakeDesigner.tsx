import React, { useState } from 'react';
import { motion } from 'motion/react';
import { triggerConfetti } from '../utils/confetti';
import { Sparkles, Heart, MessageCircle, Calendar, Edit3, ShieldCheck, Check, Plus } from 'lucide-react';
import { WHATSAPP_NUMBER, createWhatsAppUrl, MENU_ITEMS } from '../data/bakeryData';
import { MenuItem, ProductCustomization } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { BakeryDatePicker, formatDisplayDate, getOffsetDateISO } from './BakeryDatePicker';

interface CustomCakeDesignerProps {
  onAddCustomDesignToCart?: (item: MenuItem, customization: ProductCustomization) => void;
}

export const CustomCakeDesigner: React.FC<CustomCakeDesignerProps> = ({ onAddCustomDesignToCart }) => {
  const [flavor, setFlavor] = useState('Chocolate Fudge Cake');
  const [weight, setWeight] = useState(2);
  const [designTheme, setDesignTheme] = useState('3D Sculpted Car / Vehicle Theme');
  const [inscription, setInscription] = useState('Happy Birthday!');
  const [customerName, setCustomerName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => getOffsetDateISO(1));
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [addedToCartNotice, setAddedToCartNotice] = useState(false);

  const flavorOptions = [
    { name: 'Chocolate Fudge Cake', baseRate: 1500 },
    { name: 'Rasmalai Royal Fusion', baseRate: 1500 },
    { name: 'Vanilla Butter Cream', baseRate: 1000 },
    { name: 'Caramel Crunch', baseRate: 1000 },
    { name: 'Strawberry Fresh Cream', baseRate: 1000 },
    { name: 'Pistachio Specialty', baseRate: 1200 },
    { name: 'Pineapple Delight', baseRate: 1200 },
    { name: 'Rich Dutch Chocolate', baseRate: 1300 },
    { name: 'Pure Butter Cream Cake', baseRate: 2000 },
  ];

  const themeOptions = [
    { title: '3D Sculpted Car / Vehicle Theme', fee: 500, desc: 'Handcrafted buttercream rosettes, car shape, cookie wheels' },
    { title: 'Sonic & Dinosaurs Kids Theme', fee: 600, desc: 'Ruffle piping, custom themed toppers, chocolate spheres' },
    { title: 'Superhero / Barbie / Princess', fee: 600, desc: 'Themed color palette, custom cutouts, glitter & sprinkles' },
    { title: 'Royal Floral & Macaron Drip Cake', fee: 700, desc: 'Pastel drip glaze, fresh flowers/macarons, gold flakes' },
    { title: 'Edible Photo Print Cake', fee: 400, desc: 'High-res sugar sheet edible print of your photo' },
    { title: 'Classic Elegant Swirls & Pearls', fee: 200, desc: 'Refined celebration rosettes and sugar pearls' },
  ];

  const currentFlavorObj = flavorOptions.find((f) => f.name === flavor) || flavorOptions[0];
  const currentThemeObj = themeOptions.find((t) => t.title === designTheme) || themeOptions[0];

  const estimatedTotal = currentFlavorObj.baseRate * weight + currentThemeObj.fee;

  const generatedWhatsAppText = `*CUSTOM CAKE ORDER - AYESHA BAKING HOUSE*
-----------------------------
*Customer Name:* ${customerName || 'Valued Customer'}
*Flavor:* ${flavor}
*Size / Weight:* ${weight} lbs
*Design Theme:* ${designTheme}
*Cake Inscription:* "${inscription}"
*Required Delivery Date:* ${deliveryDate ? `${formatDisplayDate(deliveryDate).main} [${deliveryDate}]` : 'To be discussed'}
*Special Notes:* ${specialInstructions || 'None'}
*Estimated Total:* Rs. ${estimatedTotal}
-----------------------------
Hello Chef Ayesha! I would like to confirm this custom cake order. Please let me know the booking confirmation.`;

  const handleOrderWhatsApp = () => {
    triggerConfetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    window.open(createWhatsAppUrl(generatedWhatsAppText), '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWhatsAppText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddToCart = () => {
    if (!onAddCustomDesignToCart) return;

    // Find base item or fallback to cake
    const matchedItem = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(flavor.toLowerCase().split(' ')[0])) || MENU_ITEMS[0];
    const customItem: MenuItem = {
      ...matchedItem,
      id: `custom-cake-${Date.now()}`,
      name: `Custom ${designTheme}: ${flavor}`,
      price: currentFlavorObj.baseRate + Math.round(currentThemeObj.fee / weight),
    };

    const customization: ProductCustomization = {
      weightLbs: weight,
      spongeFlavor: flavor,
      cakeInscription: inscription,
      specialNotes: `${designTheme}. ${specialInstructions ? `Note: ${specialInstructions}. ` : ''}${customerName ? `For: ${customerName}` : ''}`,
      candlePack: true,
    };

    onAddCustomDesignToCart(customItem, customization);
    setAddedToCartNotice(true);
    setTimeout(() => setAddedToCartNotice(false), 2000);
  };

  return (
    <section id="cakes" className="py-20 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={28} className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Custom Cake Studio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] tracking-tight">
            ALL DESIGN <span className="text-[#BE185D]">CAKE PROVIDE</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037] leading-relaxed">
            Personalize every layer! Choose your favorite sponge, weight, and party theme. 
            We calculate instant pricing and prepare a formatted WhatsApp order ready to send to 
            <strong className="text-[#3E2723]"> {WHATSAPP_NUMBER}</strong>.
          </p>
        </ScrollReveal>

        {/* Builder Layout: Form on Left, Live Ticket / Summary on Right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#F0DFD5] shadow-sm space-y-6"
          >
            
            {/* 1. Base Flavor */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6E4F42] mb-2.5">
                1. Select Cake Base & Flavor
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {flavorOptions.map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setFlavor(opt.name)}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                      flavor === opt.name
                        ? 'bg-[#FCE7F3] border-[#DB2777] text-[#9D174D] font-bold shadow-xs'
                        : 'bg-[#FAF5EE]/50 border-[#EFE3DB] text-[#4E342E] hover:bg-[#FAF5EE]'
                    }`}
                  >
                    <span>{opt.name}</span>
                    <span className="mt-1 text-[11px] text-[#8D6E63]">Rs. {opt.baseRate}/lb</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Weight / Size */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6E4F42]">
                  2. Select Size / Weight ({weight} lbs)
                </label>
                <span className="text-xs font-medium text-[#BE185D]">
                  Serves approx {weight * 5} to {weight * 6} people
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {[1.5, 2, 2.5, 3, 4].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeight(w)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      weight === w
                        ? 'bg-[#3E2723] border-[#3E2723] text-white shadow-xs'
                        : 'bg-white border-[#EAD8CE] text-[#5D4037] hover:bg-[#FAF5EE]'
                    }`}
                  >
                    {w} lbs
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Design Theme */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6E4F42] mb-2.5">
                3. Choose Design Theme ("ALL DESIGN CAKE PROVIDE")
              </label>
              <div className="space-y-2">
                {themeOptions.map((thm) => (
                  <label
                    key={thm.title}
                    className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                      designTheme === thm.title
                        ? 'bg-[#FFF1F2] border-[#F43F5E] shadow-xs'
                        : 'bg-white border-[#EFE3DB] hover:bg-[#FAF5EE]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="cakeTheme"
                      checked={designTheme === thm.title}
                      onChange={() => setDesignTheme(thm.title)}
                      className="mt-1 text-[#BE185D] focus:ring-[#BE185D]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#3E2723]">
                          {thm.title}
                        </span>
                        <span className="text-xs font-bold text-[#BE185D]">
                          +Rs. {thm.fee}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6E4F42] mt-0.5">{thm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Text Inscription */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6E4F42] mb-1.5">
                  4. Message on Cake
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inscription}
                    onChange={(e) => setInscription(e.target.value)}
                    placeholder="e.g. Happy 5th Birthday Dayyan!"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAD8CE] focus:outline-none focus:ring-2 focus:ring-[#BE185D] text-xs sm:text-sm text-[#3E2723]"
                  />
                  <Edit3 className="w-4 h-4 text-[#A88B7D] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <BakeryDatePicker
                  value={deliveryDate}
                  onChange={setDeliveryDate}
                  label="5. Required Celebration Date *"
                  mode="delivery"
                />
              </div>
            </div>

            {/* 6. Special Instructions & Customer Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6E4F42] mb-1.5">
                  Your Name / Contact Person
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Dayyan / Sana"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAD8CE] focus:outline-none focus:ring-2 focus:ring-[#BE185D] text-xs sm:text-sm text-[#3E2723]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6E4F42] mb-1.5">
                  Special Customization Notes
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Eggless, specific color scheme, candle set"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAD8CE] focus:outline-none focus:ring-2 focus:ring-[#BE185D] text-xs sm:text-sm text-[#3E2723]"
                />
              </div>
            </div>

          </motion.div>

          {/* Live Order Ticket Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 sticky top-28 space-y-4"
          >
            <div className="bg-gradient-to-br from-[#FFF8F0] via-white to-[#FDF2F8] p-6 sm:p-7 rounded-3xl border-2 border-[#FBCFE8] shadow-lg relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#F5E6DF]">
                <div>
                  <span className="text-[10px] font-bold text-[#BE185D] uppercase tracking-widest">
                    Live Custom Preview
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#3E2723]">
                    Your Celebration Cake
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#BE185D]">
                  <Heart className="w-5 h-5 fill-[#BE185D]" />
                </div>
              </div>

              {/* Summary Items */}
              <div className="py-4 space-y-2.5 text-xs text-[#5D4037]">
                <div className="flex justify-between">
                  <span className="text-[#8D6E63]">Flavor:</span>
                  <span className="font-bold text-[#3E2723]">{flavor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D6E63]">Size:</span>
                  <span className="font-bold text-[#3E2723]">{weight} lbs (Rs. {currentFlavorObj.baseRate * weight})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D6E63]">Design Theme:</span>
                  <span className="font-bold text-[#3E2723] text-right">{designTheme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D6E63]">Theme Artistry:</span>
                  <span className="font-bold text-[#BE185D]">+ Rs. {currentThemeObj.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D6E63]">Piped Inscription:</span>
                  <span className="font-semibold italic text-[#831843]">"{inscription}"</span>
                </div>
                {deliveryDate && (
                  <div className="flex justify-between">
                    <span className="text-[#8D6E63]">Date:</span>
                    <span className="font-medium text-[#3E2723]">{deliveryDate}</span>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-[#F5E6DF] flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-[#8D6E63]">Estimated Price:</p>
                  <p className="text-2xl font-serif font-black text-[#BE185D]">
                    Rs. {estimatedTotal}
                  </p>
                </div>
                <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Freshly Baked
                </span>
              </div>

              {/* Order Actions */}
              <div className="mt-6 space-y-2.5">
                {onAddCustomDesignToCart && (
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      addedToCartNotice
                        ? 'bg-[#15803D] text-white'
                        : 'bg-[#BE185D] hover:bg-[#9D174D] text-white shadow-md'
                    }`}
                  >
                    {addedToCartNotice ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Order Bag!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Custom Design to Order Bag</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  id="btn-order-custom-whatsapp"
                  onClick={handleOrderWhatsApp}
                  className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-[#15803D] hover:bg-[#166534] shadow transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Directly to WhatsApp</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-[#5D4037] hover:bg-white/80 border border-[#EAD8CE] transition-colors flex items-center justify-center gap-1.5"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : null}
                  <span>{isCopied ? 'Order Details Copied!' : 'Copy Order Text'}</span>
                </button>
              </div>

              <p className="mt-3 text-[11px] text-center text-[#8D6E63]">
                Direct line to Chef Ayesha: <strong className="text-[#3E2723]">{WHATSAPP_NUMBER}</strong>
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
