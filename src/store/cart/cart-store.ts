import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductTocart: (product: CartProduct) => void;
  // addProductToCart
  // updateProductQuantity
  // RremoveProduct

  getTotalItems: () => number;
}
// get me permite obtener el estado actual
export const useCartStore = create<State>()(
  // guarda en el localstorage

  persist(
    (set, get) => ({
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total,item) => total + item.quantity, 0);
      },
      cart: [],
      // Methods
      addProductTocart: (product: CartProduct) => {
        const { cart } = get();
        // Check if product exist
        const productInCart = cart.some((item) => {
          return item.id === product.id && item.size === product.size;
        });
        if (!productInCart) {
          set({
            cart: [...cart, product],
          });
          return;
        }

        // If product exist by size, increment the quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({
          cart: updatedCartProducts,
        });
      },
    }),
    {
      name: "shopping-cart",
      // skipHydration: true,
      // evita que tengamos problema de que salga el error, pero tenemos que
    }
  )
);
