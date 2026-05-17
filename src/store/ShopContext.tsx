import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products } from '../data/catalog';

type CartItem = {
  productId: string;
  quantity: number;
  color: string;
  size: string;
};

type CheckoutDraft = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
};

type ShopContextValue = {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  cartDrawerOpen: boolean;
  addToCart: (item: CartItem) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  checkoutDraft: CheckoutDraft;
  updateCheckoutDraft: (value: Partial<CheckoutDraft>) => void;
};

const defaultDraft: CheckoutDraft = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  paymentMethod: 'UPI'
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = window.localStorage.getItem('valoria-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = window.localStorage.getItem('valoria-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [checkoutDraft, setCheckoutDraft] = useState<CheckoutDraft>(() => {
    const saved = window.localStorage.getItem('valoria-checkout');
    return saved ? JSON.parse(saved) : defaultDraft;
  });

  useEffect(() => {
    window.localStorage.setItem('valoria-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem('valoria-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.localStorage.setItem('valoria-checkout', JSON.stringify(checkoutDraft));
  }, [checkoutDraft]);

  const value = useMemo<ShopContextValue>(() => {
    const subtotal = cart.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    return {
      cart,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      wishlist,
      cartDrawerOpen,
      addToCart: (item) => {
        setCart((current) => {
          const existingIndex = current.findIndex(
            (entry) =>
              entry.productId === item.productId &&
              entry.color === item.color &&
              entry.size === item.size,
          );

          if (existingIndex >= 0) {
            return current.map((entry, index) =>
              index === existingIndex
                ? { ...entry, quantity: entry.quantity + item.quantity }
                : entry,
            );
          }

          return [...current, item];
        });
        setCartDrawerOpen(true);
      },
      updateQuantity: (index, quantity) =>
        setCart((current) =>
          current.map((entry, currentIndex) =>
            currentIndex === index
              ? { ...entry, quantity: Math.max(1, quantity) }
              : entry,
          ),
        ),
      removeFromCart: (index) =>
        setCart((current) => current.filter((_, currentIndex) => currentIndex !== index)),
      clearCart: () => setCart([]),
      toggleWishlist: (productId) =>
        setWishlist((current) =>
          current.includes(productId)
            ? current.filter((entry) => entry !== productId)
            : [...current, productId],
        ),
      isWishlisted: (productId) => wishlist.includes(productId),
      openCartDrawer: () => setCartDrawerOpen(true),
      closeCartDrawer: () => setCartDrawerOpen(false),
      checkoutDraft,
      updateCheckoutDraft: (value) =>
        setCheckoutDraft((current) => ({ ...current, ...value })),
    };
  }, [cart, cartDrawerOpen, checkoutDraft, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }
  return context;
}
