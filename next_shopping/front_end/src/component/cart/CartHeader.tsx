"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

interface CartHeaderProps {
    itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
    const router = useRouter();

    return (
        <header className="bg-white border-b border-gray-200 py-6 px-4 mb-8 shadow-xs">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    Cart
                    <span className="text-amber-500 text-xl font-bold">
                        ({itemCount})
                    </span>
                </h1>

                <Button
                    variant="tertiary"
                    size="sm"
                    onPress={() => router.push("/")}
                    className="bg-amber-50 text-amber-700 hover:bg-amber-100 font-semibold"
                >
                    Continue
                </Button>
            </div>
        </header>
    );
}