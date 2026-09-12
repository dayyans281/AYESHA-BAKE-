import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, Heart, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col"
        >
          {/* Cart Header */}
          <div className="p-5 bg-gradient-to-r from-[#4E342E] via-[#3E2723] to-[#2D1810] text-white flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FCE7F3] flex items-center justify-center text-[#BE185D]">
                <ShoppingBag className="w-4 h-4 text-[#BE185D]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">Your Bakery Bag</h3>
                <span className="text-[11px] text-rose-200">
                  {cartItems.length} customized bake{cartItems.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-rose-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FCE7F3] mx-auto flex items-center justify-center text-[#BE185D]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#3E2723]">Your bag is empty</h4>
                  <p className="text-xs text-[#6E4F42] mt-1 max-w-xs mx-auto">
                    Select any cake from our menu or gallery and customize sizes, flavors, and inscriptions!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#BE185D] hover:bg-[#9D174D] shadow transition-all"
                >
                  Explore Bakery Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#F0DFD5]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
                    Customized Items ({cartItems.length})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-rose-600 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((ci) => (
                    <div
                      key={ci.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#EFE3DB] shadow-xs space-y-2.5"
                    >
                      <div className="flex gap-3 items-start">
                        <img
                          src={ci.item.image}
                          alt={ci.item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-[#EAD8CE] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-sm text-[#3E2723] truncate">
                            {ci.item.name}
                          </h4>
                          <span className="text-xs font-bold text-[#BE185D]">
                            Rs. {ci.unitPrice} each
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(ci.id)}
                          className="p-1.5 text-[#A88B7D] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="flex flex-wrap gap-1 text-[10px] text-[#6E4F42] bg-[#FAF5EE] p-2 rounded-xl border border-[#EFE3DB]">
                        {ci.customization.weightLbs && (
                          <span className="font-bold text-[#BE185D]">
                            {ci.customization.weightLbs} lbs
                          </span>
                        )}
                        {ci.customization.pieceCount && (
                          <span className="font-bold text-[#BE185D]">
                            {ci.customization.pieceCount} pcs
                          </span>
                        )}
                        {ci.customization.spongeFlavor && (
                          <span>• {ci.customization.spongeFlavor}</span>
                        )}
                        {ci.customization.sweetnessLevel && (
                          <span>• {ci.customization.sweetnessLevel}</span>
                        )}
                        {ci.customization.isEggless && (
                          <span className="text-emerald-700 font-bold">• 100% Eggless</span>
                        )}
                        {ci.customization.cakeInscription && (
                          <span className="text-[#9D174D] block w-full italic mt-0.5">
                            Piped: "{ci.customization.cakeInscription}"
                          </span>
                        )}
                      </div>

                      {/* Quantity and Total Row */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 border border-[#E8D8CF] rounded-lg p-0.5 bg-[#FAF5EE]">
                          <button
                            onClick={() => onUpdateQuantity(ci.id, ci.quantity - 1)}
                            className="w-6 h-6 rounded bg-white text-[#3E2723] flex items-center justify-center hover:bg-rose-50 font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#3E2723] w-4 text-center">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(ci.id, ci.quantity + 1)}
                            className="w-6 h-6 rounded bg-white text-[#3E2723] flex items-center justify-center hover:bg-rose-50 font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-[#3E2723]">
                          Rs. {ci.totalPrice}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-[#F0DFD5] space-y-3.5 shrink-0">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider block">
                    Estimated Subtotal
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    Includes all cake customizations
                  </span>
                </div>
                <span className="font-serif font-black text-2xl text-[#BE185D]">
                  Rs. {subtotal}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                id="btn-open-checkout-modal"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-[#BE185D] hover:bg-[#9D174D] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Online Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8D6E63]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-risk ordering • Pay on delivery or direct bank transfer</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
