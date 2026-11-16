"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface CartHeaderProps {
    itemCount : number;
}

export default function CartHeader({ itemCount } : CartHeaderProps) {
    const router = useRouter();

    return (
        <div className="bg-white border-b border-gray-200 py-6 px-4 mb-8 shadow-xs">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    Cart
                    <span className="text-amber-500 text-xl font-bold">
                        ({itemCount})
                    </span>
                    <Button 
                        variant="danger-soft"
                        size="sm"
                        onClick={()=> router.push('/')}>
                        Continue
                    </Button>
                </h1>
            </div>                
        </div>
    )
}