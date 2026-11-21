"use client";

import React from "react";
import type { Selection } from "@heroui/react";
import { useCartStore } from "@/zustand/useCartStore";
import CartEmpty from "@/component/cart/CartEmpty";
import CartHeader from "@/component/cart/CartHeader";
import CartSummary from "@/component/cart/CartSummary";
import CartTable from "@/component/cart/CartTable";

export default function Page() {
    const items = useCartStore((state) => state.items);
    const [isMounted, setIsMounted] = React.useState(false);
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>("all");

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const selectedItems = React.useMemo(() => {
        if (selectedKeys === "all") return items;
        return items.filter((item) => selectedKeys.has(item.id));
    }, [items, selectedKeys]);

    if (!isMounted) {
        return <div className="min-h-screen bg-gray-50" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <CartHeader itemCount={items.length} />

            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <CartTable
                            items={items}
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <CartSummary items={selectedItems} />
                    </div>
                </div>
            </div>
        </div>
    );
}