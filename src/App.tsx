import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { CustomCakeDesigner } from './components/CustomCakeDesigner';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CheckoutModal } from './components/CheckoutModal';
import { GeminiCakeAdvisor } from './components/GeminiCakeAdvisor';
import { WelcomeSplashModal } from './components/WelcomeSplashModal';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';
import { focusMusic } from './utils/focusMusicEngine';
import { MenuItem, CartItem, ProductCustomization, GalleryItem } from './types';
import { MessageCircle, Sparkles, Cake, ShoppingBag } from 'lucide-react';
import { WHATSAPP_NUMBER, createWhatsAppUrl, MENU_ITEMS } from './data/bakeryData';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ayesha_bake_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ayesha_bake_cart_v2', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleEnterWithMusic = async () => {
    setIsWelcomeOpen(false);
    const started = await focusMusic.start();
    if (started) {
      setIsMusicPlaying(true);
      showToast("🎵 Playing: Focus Music for Work and Studying, Background Music for Concentration, Study Music");
    }
  };

  const handleToggleMusic = async () => {
    if (isMusicPlaying) {
      focusMusic.stop();
      setIsMusicPlaying(false);
      showToast("⏸️ Background Music Paused");
    } else {
      const started = await focusMusic.start();
      if (started) {
        setIsMusicPlaying(true);
        showToast("🎵 Playing: Focus Music for Work and Studying");
      }
    }
  };

  // Helper to calculate price of customized item
  const computeItemUnitPrice = (item: MenuItem, cust: ProductCustomization): number => {
    const isCake = item.category === 'cakes' || item.category === 'signature';
    let base = 0;
    if (isCake) {
      const weight = cust.weightLbs || item.defaultWeight || 2;
      base = item.price * weight;
    } else if (item.category === 'cupcakes') {
      const pcs = cust.pieceCount || 6;
      base = (item.price / 6) * pcs;
    } else {
      const pcs = cust.pieceCount || 1;
      base = item.price * pcs;
    }

    if (cust.isEggless) base += 100 * (isCake ? (cust.weightLbs || 2) : 1);
    if (cust.sparklerCandle) base += 150;
    if (cust.giftBoxRibbon) base += 200;

    return Math.round(base);
  };

  // Add customized item to cart
  const handleAddToCartWithCustomization = (
    item: MenuItem,
    customization: ProductCustomization,
    quantity = 1
  ) => {
    const unitPrice = computeItemUnitPrice(item, customization);
    const totalPrice = unitPrice * quantity;
    const cartItemId = `${item.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newItem: CartItem = {
      id: cartItemId,
      item,
      quantity,
      customization,
      unitPrice,
      totalPrice,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added "${item.name}" to your order bag!`);
  };

  // Quick Add from Menu
  const handleQuickAdd = (item: MenuItem, weightLbs?: number) => {
    const isCake = item.defaultWeight !== undefined;
    const customization: ProductCustomization = {
      weightLbs: isCake ? (weightLbs || item.defaultWeight || 2) : undefined,
      pieceCount: !isCake ? 1 : undefined,
      sweetnessLevel: 'Standard',
      candlePack: isCake,
    };

    handleAddToCartWithCustomization(item, customization, 1);
  };

  // Open customizer from gallery
  const handleSelectGalleryItemForOrder = (galleryItem: GalleryItem) => {
    const matched = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(galleryItem.title.toLowerCase().split(' ')[0]));
    const itemToCustomize: MenuItem = matched || {
      id: galleryItem.id,
      name: galleryItem.title,
      category: galleryItem.category === 'cupcakes' ? 'cupcakes' : 'signature',
      price: galleryItem.basePrice ? Math.round(galleryItem.basePrice / 2) : 1500,
      description: galleryItem.description,
      image: galleryItem.image,
      flavorNotes: [galleryItem.flavor || 'Signature Artisan Flavor'],
      defaultWeight: 2,
    };

    setCustomizingItem(itemToCustomize);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.id === id
          ? {
              ...ci,
              quantity: newQty,
              totalPrice: ci.unitPrice * newQty,
            }
          : ci
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
    showToast('Item removed from order bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Order bag cleared');
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2C1810] font-sans selection:bg-[#FCE7F3] selection:text-[#9D174D]">
      {/* Sticky Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderNow={() => scrollToSection('menu')}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenWelcome={() => setIsWelcomeOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero
          onOrderNowClick={() => scrollToSection('menu')}
          onExploreMenuClick={() => scrollToSection('menu')}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        />

        <AboutSection
          onCustomCakeClick={() => scrollToSection('cakes')}
        />

        <MenuSection
          onAddToCart={handleQuickAdd}
          onCustomizeItem={(item) => setCustomizingItem(item)}
        />

        <CustomCakeDesigner
          onAddCustomDesignToCart={(item, cust) => handleAddToCartWithCustomization(item, cust, 1)}
        />

        <GallerySection
          onSelectForOrder={handleSelectGalleryItemForOrder}
        />

        <ReviewsSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Customizer Modal */}
      <ProductCustomizerModal
        isOpen={Boolean(customizingItem)}
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCartWithCustomization}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Secure Online Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Gemini AI Cake Concierge */}
      <GeminiCakeAdvisor
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
      />

      {/* Floating Bottom Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Floating Cart Trigger if items exist */}
        {cartItems.length > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#BE185D] hover:bg-[#9D174D] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-xs font-bold"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({totalCartCount}) • Rs. {cartItems.reduce((s, i) => s + i.totalPrice, 0)}</span>
          </button>
        )}

        {/* AI Advisor floating trigger */}
        <button
          onClick={() => setIsAiAdvisorOpen(true)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 text-[#831843] border border-[#F472B6]/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-bold"
          title="Ask AI Cake Advisor"
        >
          <Sparkles className="w-4 h-4 text-[#DB2777]" />
          <span className="hidden sm:inline">AI Cake Advisor</span>
        </button>

        {/* WhatsApp Direct Floating Button with Pulse Effect */}
        <a
          href={createWhatsAppUrl("Hello Ayesha Bake! I want to order a cake.")}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#15803D] hover:bg-[#166534] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          title={`Order on WhatsApp: ${WHATSAPP_NUMBER}`}
        >
          <span className="absolute -inset-1 rounded-full bg-[#22c55e]/40 animate-ping pointer-events-none" />
          <MessageCircle className="w-5 h-5 fill-white shrink-0 relative z-10" />
          <div className="flex flex-col text-left relative z-10">
            <span className="text-[10px] font-semibold text-emerald-200 uppercase leading-none">
              Order on WhatsApp
            </span>
            <span className="text-xs font-bold leading-tight font-mono">
              {WHATSAPP_NUMBER}
            </span>
          </div>
        </a>
      </div>

      {/* Background Music Floating Player */}
      <BackgroundMusicPlayer
        isPlaying={isMusicPlaying}
        onTogglePlay={handleToggleMusic}
      />

      {/* Colorful Welcome to Ayesha Bake Modal */}
      <WelcomeSplashModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
        onEnterWithMusic={handleEnterWithMusic}
        onEnterSilent={() => setIsWelcomeOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#3E2723] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <Cake className="w-4 h-4 text-[#F472B6]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
