import { ProductDetailResponse } from "@/lib/api/product/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartItem extends ProductDetailResponse{
    quantity : number;
    selectedOptionId? : string;
}

interface CartState {
    items : CartItem[],
    addItem : (product : ProductDetailResponse, quantity? : number, selectedOptionId? : string) => void;
    updateQuantity : (id : string, delta : number) => void;
    removeItem : (id : string) => void;
    clearCart : ()=> void
}

export const useCartStore = create<CartState>()(persist(
    (set) => ({
        items : [],

        addItem: (proudct, quantity = 1, selectedOptionId)=> set((state)=> {
            const exitingIndex = state.items.findIndex((item)=> item.id === proudct.id && item.selectedOptionId === selectedOptionId);

            if(exitingIndex > -1) {
                const updated = [...state.items];
                updated[exitingIndex].quantity += quantity;
                return { 
                    items : updated
                };
            }

            return {
                items : [...state.items, { ...proudct, quantity, selectedOptionId }]
            }
        }),

        updateQuantity : (id, delta) => set((state)=> ({
            items : state.items.map((item)=> {
                if(item.id === id) {
                    const nextQuantity = item.quantity + delta;
                    return nextQuantity > 0 
                        ? {...item, quantity : nextQuantity}
                        : item
                };
                return item;
            })
        })),

        removeItem : (id) => set((state) => ({
            items : state.items.filter((item)=> item.id !== id)
        })),

        clearCart : ()=> set({ items : []})
    }),
    {
        name : 'next-shopping-cart',
        storage : createJSONStorage(()=> sessionStorage)
    }
))