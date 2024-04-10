import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductTocart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsIncart: number;
  };
}
// get me permite obtener el estado actual
export const useCartStore = create<State>()(
  // guarda en el localstorage

  persist(
    (set, get) => ({
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
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
      updateProductQuantity(product, quantity) {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      removeProduct(product: CartProduct) {
        const { cart } = get();

        const updatedCartFilter = cart.filter((item) => {
          return item.id !== product.id || product.size !== item.size;
        });
        set({ cart: updatedCartFilter });
      },
      getSummaryInformation() {
        const { cart } = get();
        const iva = 0.15;
        const subTotal: number = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * iva;
        const total = subTotal + tax;
        const itemsIncart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return {
          subTotal,
          tax,
          total,
          itemsIncart,
        };
      },
    }),
    {
      name: "shopping-cart",
      // skipHydration: true,
      // evita que tengamos problema de que salga el error, pero tenemos que
    }
  )
);
