export interface MenuItem {
  id: string;
  name: string;
  category: 'cakes' | 'signature' | 'pastries' | 'brownies' | 'cupcakes';
  price: number; // in PKR / Rs.
  unitText?: string; // e.g. "per lb", "per piece"
  description: string;
  image: string;
  popular?: boolean;
  flavorNotes: string[];
  defaultWeight?: number; // in lbs
  servings?: string;
  availableSizes?: number[]; // e.g. [1, 2, 3, 4, 5]
}

export interface ProductCustomization {
  weightLbs?: number;
  pieceCount?: number;
  spongeFlavor?: string;
  frostingType?: string;
  sweetnessLevel?: 'Standard' | 'Mild / Less Sweet';
  isEggless?: boolean;
  cakeInscription?: string;
  candlePack?: boolean;
  sparklerCandle?: boolean;
  giftBoxRibbon?: boolean;
  specialNotes?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  item: MenuItem;
  quantity: number;
  customization: ProductCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomCakeRequest {
  occasion: string;
  theme: string;
  baseFlavor: string;
  weightLbs: number;
  inscription: string;
  recipientName: string;
  deliveryDate: string;
  specialNotes: string;
}

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  occasion: string;
  rating: number;
  date: string;
  comment: string;
  cakeOrdered: string;
  verifiedBuyer?: boolean;
  likesCount?: number;
}

export type GalleryCategory = 'all' | 'wedding' | 'birthday' | 'kids' | 'fusion' | 'cupcakes';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  description: string;
  tag: string;
  servings?: string;
  flavor?: string;
  basePrice?: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryAddress: string;
  deliveryArea: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'jazzcash_easypaisa';
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    cakeName?: string;
    weight?: string;
    whatsappText?: string;
  };
}
