import React, { useState, useEffect } from 'react';
import { Cake, ShoppingBag, Phone, MessageCircle, Menu as MenuIcon, X, Sparkles, Music, Volume2, Camera } from 'lucide-react';
import { WHATSAPP_NUMBER, createWhatsAppUrl } from '../data/bakeryData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderNow: () => void;
  onOpenAiAdvisor: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
  onOpenWelcome?: () => void;
  onOpenPhotoManager?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenOrderNow,
  onOpenAiAdvisor,
  isMusicPlaying = false,
  onToggleMusic,
  onOpenWelcome,
  onOpenPhotoManager,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Cakes', href: '#cakes' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#4E342E] text-[#FFF8F0] text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {onOpenWelcome && (
          <button
            onClick={onOpenWelcome}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-[11px] hover:opacity-90 shadow-xs transition-opacity cursor-pointer"
            title="Open Welcome to Ayesha Baking House Celebration"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Welcome Banner</span>
          </button>
        )}

        {onOpenPhotoManager && (
          <button
            onClick={onOpenPhotoManager}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#BE185D] hover:bg-[#9D174D] text-white font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
            title="Upload and manage real cake photos"
          >
            <Camera className="w-3 h-3" />
            <span>Upload Real Photos / تصاویر</span>
          </button>
        )}

        <span className="inline-flex items-center gap-1.5 font-semibold text-[#FDBA74]">
          <Sparkles className="w-3.5 h-3.5 text-[#FDBA74]" />
          ALL DESIGN CAKE PROVIDE
        </span>
        <span className="hidden md:inline text-rose-200">|</span>
        <span className="hidden md:inline text-rose-100">Freshly Baked with Love for Birthdays, Weddings & Parties</span>
        <span className="text-rose-200">|</span>

        {onToggleMusic && (
          <button
            onClick={onToggleMusic}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
              isMusicPlaying
                ? 'bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700'
                : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
            }`}
            title="Focus Music for Work and Studying, Background Music for Concentration, Study Music"
          >
            <Music className="w-3 h-3" />
            <span>{isMusicPlaying ? 'Music: ON' : 'Play Music'}</span>
          </button>
        )}

        <span className="hidden sm:inline text-rose-200">|</span>
        <a
          href={createWhatsAppUrl("Hello Ayesha Baking House! I want to order a cake.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-[#86EFAC] transition-colors font-bold underline decoration-dotted"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#4ADE80]" />
          WhatsApp: {WHATSAPP_NUMBER}
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF9]/95 backdrop-blur-md shadow-sm border-b border-[#F5E6DF]'
            : 'bg-[#FFFDF9] border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FCE7F3] via-[#FBCFE8] to-[#FED7AA] flex items-center justify-center shadow-inner text-[#BE185D] group-hover:scale-105 transition-transform duration-200">
                <Cake className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#3E2723] uppercase">
                  AYESHA BAKING HOUSE
                </span>
                <span className="text-xs font-medium text-[#BE185D] tracking-wider uppercase -mt-1 font-script text-base sm:text-lg">
                  Baked with Love, Made for You
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-semibold text-[#4A3B32] hover:text-[#DB2777] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#DB2777] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Photo Manager Button */}
              {onOpenPhotoManager && (
                <button
                  onClick={onOpenPhotoManager}
                  className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#BE185D] bg-white border border-[#F472B6]/40 hover:bg-[#FCE7F3] transition-all hover:scale-102 cursor-pointer shadow-2xs"
                  title="Upload / Change Cake Photos"
                >
                  <Camera className="w-3.5 h-3.5 text-[#BE185D]" />
                  <span>Upload Photos</span>
                </button>
              )}

              {/* AI Cake Advisor Button */}
              <button
                id="btn-ai-advisor-nav"
                onClick={onOpenAiAdvisor}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#831843] bg-[#FCE7F3] hover:bg-[#FBCFE8] border border-[#F472B6]/40 transition-all hover:scale-102"
                title="Ask AI Cake Advisor"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DB2777]" />
                <span>AI Cake Advisor</span>
              </button>

              {/* Cart Button */}
              <button
                id="btn-open-cart"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full text-[#4E342E] hover:bg-[#FCE7F3]/60 transition-colors"
                aria-label="View Order Bag"
              >
                <ShoppingBag className="w-5 h-5 text-[#4E342E]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DB2777] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Prominent Order Now Button */}
              <button
                id="btn-nav-order-now"
                onClick={onOpenOrderNow}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#DB2777] to-[#BE185D] hover:from-[#BE185D] hover:to-[#9D174D] shadow-md shadow-pink-500/25 transition-all hover:shadow-lg hover:scale-102 active:scale-98"
              >
                <Cake className="w-4 h-4" />
                <span>Order Now</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#4E342E] hover:bg-[#F5E6DF] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFDF9] border-b border-[#F5E6DF] px-5 py-4 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-[#4E342E] hover:bg-[#FCE7F3] hover:text-[#BE185D] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-[#F5E6DF] flex flex-col gap-2">
              {onOpenPhotoManager && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPhotoManager();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#BE185D] bg-pink-50 border border-pink-200"
                >
                  <Camera className="w-4 h-4 text-[#BE185D]" />
                  <span>Upload Real Cake Photos / تصاویر</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAdvisor();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#831843] bg-[#FCE7F3]"
              >
                <Sparkles className="w-4 h-4 text-[#DB2777]" />
                Ask Chef Ayesha's AI Cake Advisor
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderNow();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#DB2777] to-[#BE185D] shadow"
              >
                <Cake className="w-4 h-4" />
                Order Now
              </button>

              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-[#4E342E] bg-[#FAF5EE] border border-[#E8D8CF]"
              >
                <Phone className="w-3.5 h-3.5 text-[#059669]" />
                Call Hotline: {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
