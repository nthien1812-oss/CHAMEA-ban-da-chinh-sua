import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem } from '../types';
import { PRODUCTS } from '../data/chameaData';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, quantity?: number) => void;
  updateQuantity: (productId: string, colorCode: string, quantity: number) => void;
  removeFromCart: (productId: string, colorCode: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  isPromoActive: boolean;
  setIsPromoActive: (active: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isConsultationOpen: boolean;
  setIsConsultationOpen: (open: boolean) => void;
  consultationProduct: Product | null;
  openConsultation: (product?: Product | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'chamea_cart_v1';
const WISHLIST_STORAGE_KEY = 'chamea_wishlist_v1';
const PROMO_STORAGE_KEY = 'chamea_promo_20_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Demo campaign toggle (20% off demo)
  const [isPromoActive, setIsPromoActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return true; // Default active for campaign demo
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationProduct, setConsultationProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(isPromoActive));
    } catch {
      // ignore
    }
  }, [isPromoActive]);

  const addToCart = (product: Product, color: ProductColor, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.code === color.code
      );
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      } else {
        return [...prevCart, { product, selectedColor: color, quantity }];
      }
    });
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (productId: string, colorCode: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorCode);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedColor.code === colorCode
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, colorCode: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedColor.code === colorCode)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openConsultation = (product: Product | null = null) => {
    setConsultationProduct(product || null);
    setIsConsultationOpen(true);
  };

  // Price calculation: Consistent unit price from product.price
  // (which already reflects the 20% discount when promo is active)
  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = isPromoActive
      ? item.product.price
      : item.product.originalPrice || item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isPromoActive,
        setIsPromoActive,
        isSearchOpen,
        setIsSearchOpen,
        isConsultationOpen,
        setIsConsultationOpen,
        consultationProduct,
        openConsultation,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
