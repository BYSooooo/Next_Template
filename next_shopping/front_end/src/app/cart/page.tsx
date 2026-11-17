"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { CartItem } from "@/zustand/useCartStore";
import CartEmpty from "@/component/cart/CardEmpty";

interface CartItemCardProp {
    totalCount : number;
    
}

export default function Page() {

    const router = useRouter();

    return (
        <>
        
        </>
    )



}