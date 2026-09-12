import React, { useState } from 'react';
import { MessageCircle, Phone, Clock, MapPin, Sparkles, ChevronDown, ChevronUp, Heart, Send } from 'lucide-react';
import { WHATSAPP_NUMBER, createWhatsAppUrl, FAQ_ITEMS } from '../data/bakeryData';

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSendQuickWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Ayesha Bake House! My name is ${inquiryName || 'Customer'}. ${inquiryMsg || 'I would like to inquire about ordering a custom cake.'}`;
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF5EE]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3E2723] tracking-tight">
            Order & <span className="text-[#BE185D]">Contact Us</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D4037] leading-relaxed">
            Have a question or custom design idea? We are only one WhatsApp message away! 
            Reach out directly to Chef Ayesha for fresh, made-with-love bakes.
          </p>
        </div>

        {/* Contact Grid: Cards + Quick Message Form + FAQ */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Direct WhatsApp Hotline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary WhatsApp Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-[#15803D] to-[#166534] text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                    Official WhatsApp Order Line
                  </span>
                  <h3 className="text-2xl font-bold font-sans tracking-tight">
                    {WHATSAPP_NUMBER}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-emerald-100 leading-relaxed mb-6">
                Send us your cake reference picture, desired flavors, delivery date, or guest count. 
                We confirm quotes and delivery slots rapidly!
              </p>

              <a
                href={createWhatsAppUrl("Hello Ayesha Bake House! I would like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-white text-[#15803D] font-bold text-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-[#15803D]" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>

            {/* Quick Details Cards */}
            <div className="p-6 rounded-3xl bg-white border border-[#F0DFD5] shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FCE7F3] flex items-center justify-center text-[#BE185D] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E4F42]">Direct Call</h4>
                  <a href={`tel:${WHATSAPP_NUMBER}`} className="text-sm font-bold text-[#3E2723] hover:underline">
                    {WHATSAPP_NUMBER}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#92400E] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E4F42]">Baking & Order Hours</h4>
                  <p className="text-xs text-[#3E2723] font-medium">9:00 AM – 10:00 PM (Monday – Sunday)</p>
                  <p className="text-[11px] text-[#8D6E63]">Orders accepted 24/7 on WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#15803D] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E4F42]">Bakery Kitchen & Delivery</h4>
                  <p className="text-xs text-[#3E2723] font-medium">Doorstep Cake Delivery Available</p>
                  <p className="text-[11px] text-[#8D6E63]">Carefully packed in insulated safety cake boxes</p>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="p-6 rounded-3xl bg-white border border-[#F0DFD5] shadow-xs">
              <h4 className="text-base font-serif font-bold text-[#3E2723] mb-1">
                Quick WhatsApp Message
              </h4>
              <p className="text-xs text-[#6E4F42] mb-4">
                Type your inquiry and it will open directly in your WhatsApp app.
              </p>

              <form onSubmit={handleSendQuickWhatsApp} className="space-y-3">
                <input
                  type="text"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAD8CE] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                />
                <textarea
                  rows={3}
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  placeholder="Tell us what cake you want, date, or party theme..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAD8CE] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#BE185D] hover:bg-[#9D174D] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right: Frequently Asked Questions */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#F0DFD5] shadow-xs">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#BE185D] uppercase tracking-wider">
                Help & Information
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#3E2723]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-[#6E4F42] mt-1">
                Everything you need to know about our custom bakes and delivery.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#EFE3DB] overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-[#FFFDF9] hover:bg-[#FAF5EE]"
                    >
                      <span className="text-xs sm:text-sm font-bold text-[#3E2723]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#BE185D] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#A88B7D] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-[#5D4037] leading-relaxed bg-[#FFFDF9] border-t border-[#F5E6DF]/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Promise Box */}
            <div className="mt-8 p-5 rounded-2xl bg-[#FDF2F8] border border-[#FCE7F3] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#BE185D] shrink-0 shadow-xs">
                <Heart className="w-5 h-5 fill-[#BE185D]" />
              </div>
              <div className="text-xs text-[#831843]">
                <p className="font-bold">Our Freshness Guarantee</p>
                <p className="mt-0.5">
                  Every order is baked specially for you—never pre-baked or frozen. We guarantee pure satisfaction with every bite!
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
