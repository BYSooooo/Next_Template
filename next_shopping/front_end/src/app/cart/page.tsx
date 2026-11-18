"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { CartItem, useCartStore } from "@/zustand/useCartStore";
import CartEmpty from "@/component/cart/CardEmpty";
import CartHeader from "@/component/cart/CartHeader";
import CartSummary from "@/component/cart/CartSummary";

interface CartItemCardProp {
    totalCount : number;
    
}

export default function Page() {

    const items = useCartStore((state)=> state.items);
    const [isMounted, setisMounted] = React.useState(false);

    React.useEffect(()=> {
        setisMounted(true)
        
    },[]);

    if(!isMounted) {
        return <div className="min-h-screen bg-gray-50"/>
    }

    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <CartHeader itemCount={items.length} />
            <div className="max-w-6xl mx-auto px-4">
                {items.length !== 0 ? (
                    <CartEmpty />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div>
                        </div>
                        <div className="lg:col-span-1">
                            <CartSummary items={items} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )



}