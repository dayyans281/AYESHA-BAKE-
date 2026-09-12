import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Truck,
  ShoppingBag,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Printer,
  Copy,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { CartItem, OrderDetails } from '../types';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  const [step, setStep] = useState<'review' | 'details' | 'payment' | 'confirmed'>('review');

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Afternoon (2:00 PM – 5:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'jazzcash_easypaisa'>('cod');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 150 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleProceedToDetails = () => {
    if (cartItems.length === 0) return;
    setStep('details');
  };

  const handleProceedToPayment = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and WhatsApp contact number.');
      return;
    }
    if (deliveryMethod === 'delivery' && !deliveryAddress.trim()) {
      alert('Please provide your delivery address.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const orderId = `AB-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData: OrderDetails = {
      orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress.trim() : 'Self-Pickup (Home Bakery Kitchen)',
      deliveryArea: deliveryArea.trim() || 'City Central',
      deliveryDate,
      deliveryTimeSlot,
      paymentMethod,
      specialInstructions: specialInstructions.trim() || undefined,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      grandTotal,
      createdAt: new Date().toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setConfirmedOrder(orderData);
    setStep('confirmed');
    onClearCart();

    triggerConfetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const generateWhatsAppMessage = (order: OrderDetails) => {
    let text = `🍰 *NEW VERIFIED ORDER: ${order.orderId}*\n`;
    text += `*AYESHA BAKE HOUSE - Baked with Love, Made for You*\n`;
    text += `-------------------------------------------\n`;
    text += `👤 *Customer:* ${order.customerName}\n`;
    text += `📞 *WhatsApp:* ${order.customerPhone}\n`;
    text += `🚚 *Method:* ${order.deliveryMethod === 'delivery' ? 'Doorstep Delivery' : 'Bakery Pickup'}\n`;
    if (order.deliveryMethod === 'delivery') {
      text += `📍 *Address:* ${order.deliveryAddress} (${order.deliveryArea})\n`;
    }
    text += `📅 *Requested Date:* ${order.deliveryDate}\n`;
    text += `⏰ *Time Slot:* ${order.deliveryTimeSlot}\n`;
    text += `💳 *Payment Method:* ${
      order.paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : order.paymentMethod === 'bank_transfer'
        ? 'Direct Bank Transfer / Raast'
        : 'JazzCash / Easypaisa on delivery'
    }\n\n`;

    text += `*ORDERED ITEMS:*\n`;
    order.items.forEach((it, idx) => {
      const isCake = it.customization.weightLbs;
      text += `${idx + 1}. *${it.item.name}* x ${it.quantity}\n`;
      if (isCake) {
        text += `   • Size: ${it.customization.weightLbs} lbs\n`;
        text += `   • Sponge: ${it.customization.spongeFlavor || 'Vanilla'}\n`;
        text += `   • Frosting: ${it.customization.frostingType || 'Buttercream'}\n`;
      } else if (it.customization.pieceCount) {
        text += `   • Pieces: ${it.customization.pieceCount} pcs\n`;
      }
      if (it.customization.sweetnessLevel) {
        text += `   • Sweetness: ${it.customization.sweetnessLevel}\n`;
      }
      if (it.customization.isEggless) {
        text += `   • Dietary: 100% Eggless (Pure Veg)\n`;
      }
      if (it.customization.cakeInscription) {
        text += `   • Piped Message: "${it.customization.cakeInscription}"\n`;
      }
      if (it.customization.sparklerCandle) {
        text += `   • Add-on: Sparkler Candle\n`;
      }
      if (it.customization.giftBoxRibbon) {
        text += `   • Add-on: Luxury Ribbon Box\n`;
      }
      text += `   Subtotal: Rs. ${it.totalPrice}\n`;
    });

    text += `-------------------------------------------\n`;
    text += `*Items Subtotal:* Rs. ${order.subtotal}\n`;
    text += `*Delivery Fee:* Rs. ${order.deliveryFee}\n`;
    text += `*GRAND TOTAL:* Rs. ${order.grandTotal}\n`;
    if (order.specialInstructions) {
      text += `📝 *Notes:* ${order.specialInstructions}\n`;
    }
    text += `-------------------------------------------\n`;
    text += `Hello Chef Ayesha! I just submitted my order on your website. Please confirm my order slot!`;

    return text;
  };

  const handleCopyReceipt = () => {
    if (!confirmedOrder) return;
    const text = generateWhatsAppMessage(confirmedOrder);
    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#F5E6DF] my-6 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Checkout Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#4E342E] via-[#3E2723] to-[#2D1810] text-white flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FCE7F3] flex items-center justify-center text-[#BE185D]">
              <ShieldCheck className="w-4 h-4 text-[#BE185D]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                AYESHA BAKE HOUSE Secure Checkout
              </h3>
              <p className="text-[11px] text-rose-200">
                Direct kitchen order verification & door-to-door delivery
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

        {/* Checkout Progress Stepper (Hidden on confirmation) */}
        {step !== 'confirmed' && (
          <div className="px-6 py-3 bg-[#FAF5EE] border-b border-[#EFE3DB] flex items-center justify-between text-xs">
            <div
              className={`flex items-center gap-1.5 font-bold ${
                step === 'review' ? 'text-[#BE185D]' : 'text-[#3E2723]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white border border-[#E8D8CF] flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Review Bag</span>
            </div>
            <span className="text-[#A88B7D]">→</span>
            <div
              className={`flex items-center gap-1.5 font-bold ${
                step === 'details' ? 'text-[#BE185D]' : 'text-[#8D6E63]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white border border-[#E8D8CF] flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Delivery Details</span>
            </div>
            <span className="text-[#A88B7D]">→</span>
            <div
              className={`flex items-center gap-1.5 font-bold ${
                step === 'payment' ? 'text-[#BE185D]' : 'text-[#8D6E63]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white border border-[#E8D8CF] flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Payment & Confirm</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-[#FFFDF9]">
          
          {/* STEP 1: REVIEW CART ITEMS */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0DFD5]">
                <h4 className="font-serif font-bold text-base text-[#3E2723]">
                  Your Customized Bakes ({cartItems.length} items)
                </h4>
                <span className="text-xs text-[#BE185D] font-bold">
                  Subtotal: Rs. {subtotal}
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#8D6E63]">
                  Your bag is currently empty. Add delicious cakes to continue!
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((ci) => (
                    <div
                      key={ci.id}
                      className="p-4 rounded-2xl bg-white border border-[#EFE3DB] shadow-2xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <img
                            src={ci.item.image}
                            alt={ci.item.name}
                            className="w-14 h-14 rounded-xl object-cover border border-[#EAD8CE] shrink-0"
                          />
                          <div>
                            <h5 className="font-serif font-bold text-sm text-[#3E2723]">
                              {ci.item.name}
                            </h5>
                            <span className="text-xs text-[#8D6E63]">
                              Qty: {ci.quantity} • Rs. {ci.totalPrice}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-serif font-bold text-[#BE185D]">
                          Rs. {ci.totalPrice}
                        </span>
                      </div>

                      {/* Customization Details Pills */}
                      <div className="pt-2 border-t border-[#F8EFE9] flex flex-wrap gap-1.5 text-[11px] text-[#6E4F42]">
                        {ci.customization.weightLbs && (
                          <span className="bg-[#FAF5EE] px-2 py-0.5 rounded-md border border-[#E8D8CF] font-semibold">
                            Size: {ci.customization.weightLbs} lbs
                          </span>
                        )}
                        {ci.customization.pieceCount && (
                          <span className="bg-[#FAF5EE] px-2 py-0.5 rounded-md border border-[#E8D8CF] font-semibold">
                            {ci.customization.pieceCount} pieces
                          </span>
                        )}
                        {ci.customization.spongeFlavor && (
                          <span className="bg-[#FAF5EE] px-2 py-0.5 rounded-md border border-[#E8D8CF]">
                            Sponge: {ci.customization.spongeFlavor}
                          </span>
                        )}
                        {ci.customization.sweetnessLevel && (
                          <span className="bg-[#FAF5EE] px-2 py-0.5 rounded-md border border-[#E8D8CF]">
                            Sweetness: {ci.customization.sweetnessLevel}
                          </span>
                        )}
                        {ci.customization.isEggless && (
                          <span className="bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-md border border-[#86EFAC] font-bold">
                            100% Eggless
                          </span>
                        )}
                        {ci.customization.cakeInscription && (
                          <span className="bg-[#FCE7F3] text-[#9D174D] px-2 py-0.5 rounded-md border border-[#FBCFE8] font-medium italic">
                            "{ci.customization.cakeInscription}"
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delivery Guarantee Info */}
              <div className="p-4 rounded-2xl bg-[#FDF2F8] border border-[#FCE7F3] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#BE185D] shrink-0" />
                <div className="text-xs text-[#831843]">
                  <p className="font-bold">Baked Fresh on Delivery Day</p>
                  <p>Never frozen, crafted with pure butter, delivered cold in safety insulated cake packaging.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY DETAILS */}
          {step === 'details' && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#3E2723] pb-2 border-b border-[#F0DFD5]">
                Recipient & Delivery Information
              </h4>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Fatima Khan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1">
                    WhatsApp Number (for confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Delivery Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1.5">
                  Fulfillment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'bg-[#FCE7F3] border-[#DB2777] text-[#9D174D]'
                        : 'bg-white border-[#E8D8CF] text-[#5D4037]'
                    }`}
                  >
                    <Truck className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold block">Doorstep Cake Delivery</span>
                      <span className="text-[11px] text-[#8D6E63] block">Insulated vehicle flat fee (Rs. 150)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'bg-[#FCE7F3] border-[#DB2777] text-[#9D174D]'
                        : 'bg-white border-[#E8D8CF] text-[#5D4037]'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold block">Kitchen Studio Pickup</span>
                      <span className="text-[11px] text-emerald-700 font-bold block">FREE Pickup</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Address (If Delivery) */}
              {deliveryMethod === 'delivery' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1">
                      Full Delivery Address & House / Flat No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. House 42-B, Street 5, Phase 4, Near Commercial Market"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1">
                      Area / Neighborhood / Landmark
                    </label>
                    <input
                      type="text"
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      placeholder="e.g. Gulberg / DHA / Johar Town / Bahria"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1">
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="Evening (6:00 PM – 9:00 PM)">Evening (6:00 PM – 9:00 PM)</option>
                    <option value="Night Celebrations (9:00 PM – 11:00 PM)">Night (9:00 PM – 11:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#3E2723] pb-2 border-b border-[#F0DFD5]">
                Select Payment Method
              </h4>

              <div className="space-y-2.5">
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-[#FCE7F3] border-[#DB2777]'
                      : 'bg-white border-[#E8D8CF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-[#BE185D]"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#3E2723] block">
                      Cash on Delivery (COD) / Pay on Pickup
                    </span>
                    <span className="text-[11px] text-[#8D6E63]">
                      Pay in cash when your fresh cake is handed to you.
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-[#FCE7F3] border-[#DB2777]'
                      : 'bg-white border-[#E8D8CF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="w-4 h-4 text-[#BE185D]"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#3E2723] block">
                      Direct Bank Transfer / Raast
                    </span>
                    <span className="text-[11px] text-[#8D6E63]">
                      Transfer directly to our bakery business account and share screenshot on WhatsApp.
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'jazzcash_easypaisa'
                      ? 'bg-[#FCE7F3] border-[#DB2777]'
                      : 'bg-white border-[#E8D8CF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'jazzcash_easypaisa'}
                    onChange={() => setPaymentMethod('jazzcash_easypaisa')}
                    className="w-4 h-4 text-[#BE185D]"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#3E2723] block">
                      JazzCash / Easypaisa on Delivery
                    </span>
                    <span className="text-[11px] text-[#8D6E63]">
                      Instant mobile wallet payment to 03442302526.
                    </span>
                  </div>
                </label>
              </div>

              {/* Special Delivery Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4E342E] mb-1">
                  Special Delivery Instructions
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Please ring the main gate bell twice, keep cake level during transport..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D8CF] text-xs sm:text-sm text-[#3E2723] bg-white focus:ring-2 focus:ring-[#BE185D] focus:outline-none"
                />
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-4 rounded-2xl bg-white border border-[#EFE3DB] space-y-2 text-xs">
                <div className="flex justify-between text-[#6E4F42]">
                  <span>Items Subtotal:</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-[#6E4F42]">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="pt-2 border-t border-[#F2DDD2] flex justify-between font-serif font-black text-base text-[#BE185D]">
                  <span>Grand Total to Pay:</span>
                  <span>Rs. {grandTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED & INVOICE */}
          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D]">
                  Order Confirmed
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#3E2723] mt-2">
                  Thank You, {confirmedOrder.customerName}!
                </h3>
                <p className="text-xs text-[#6E4F42] mt-1">
                  Your order <span className="font-mono font-bold text-[#BE185D]">{confirmedOrder.orderId}</span> has been created!
                </p>
              </div>

              {/* Digital Receipt Card */}
              <div className="text-left p-5 rounded-2xl bg-white border border-[#EFE3DB] shadow-2xs space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0DFD5]">
                  <div>
                    <span className="font-bold text-[#3E2723] text-sm block">AYESHA BAKE HOUSE Receipt</span>
                    <span className="text-[10px] text-[#8D6E63]">{confirmedOrder.createdAt}</span>
                  </div>
                  <span className="font-mono font-bold text-xs bg-[#FAF5EE] px-2 py-1 rounded-md border border-[#E8D8CF]">
                    {confirmedOrder.orderId}
                  </span>
                </div>

                <div className="space-y-1.5 text-[#5D4037]">
                  <p><strong className="text-[#3E2723]">Delivery Date:</strong> {confirmedOrder.deliveryDate} ({confirmedOrder.deliveryTimeSlot})</p>
                  <p><strong className="text-[#3E2723]">Address:</strong> {confirmedOrder.deliveryAddress}</p>
                  <p><strong className="text-[#3E2723]">Payment:</strong> {confirmedOrder.paymentMethod.toUpperCase()}</p>
                </div>

                <div className="pt-2 border-t border-[#F8EFE9] space-y-1">
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[#6E4F42]">
                      <span>
                        {it.item.name} {it.customization.weightLbs ? `(${it.customization.weightLbs} lbs)` : ''} x {it.quantity}
                      </span>
                      <span className="font-semibold">Rs. {it.totalPrice}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#F0DFD5] flex justify-between font-serif font-bold text-sm text-[#BE185D]">
                  <span>Total Amount:</span>
                  <span>Rs. {confirmedOrder.grandTotal}</span>
                </div>
              </div>

              {/* WhatsApp Transmission Button */}
              <div className="space-y-2">
                <a
                  href={createWhatsAppUrl(generateWhatsAppMessage(confirmedOrder))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-[#15803D] hover:bg-[#166534] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Order to Chef Ayesha on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-[#5D4037] hover:bg-[#FAF5EE] border border-[#E8D8CF] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedInvoice ? 'Invoice Copied to Clipboard!' : 'Copy Receipt Text'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Review, Details, Payment) */}
        {step !== 'confirmed' && (
          <div className="px-6 py-4 bg-white border-t border-[#F0DFD5] flex items-center justify-between shrink-0">
            {step === 'review' ? (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#5D4037] hover:bg-[#FAF5EE] rounded-xl"
              >
                Keep Shopping
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(step === 'payment' ? 'details' : 'review')}
                className="px-4 py-2 text-xs font-semibold text-[#5D4037] hover:bg-[#FAF5EE] rounded-xl flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-[#8D6E63] uppercase font-bold block">Total:</span>
                <span className="font-serif font-black text-lg text-[#BE185D]">
                  Rs. {grandTotal}
                </span>
              </div>

              {step === 'review' && (
                <button
                  type="button"
                  id="btn-checkout-step1"
                  disabled={cartItems.length === 0}
                  onClick={handleProceedToDetails}
                  className="px-5 py-2.5 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5"
                >
                  <span>Proceed to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 'details' && (
                <button
                  type="button"
                  id="btn-checkout-step2"
                  onClick={handleProceedToPayment}
                  className="px-5 py-2.5 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 'payment' && (
                <button
                  type="button"
                  id="btn-checkout-step3"
                  onClick={handlePlaceOrder}
                  className="px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place & Confirm Order</span>
                </button>
              )}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
