import { useCartStore } from "@/zustand/useCartStore";
import { useRouter } from "next/navigation";

import React from 'react';

export default function Page(){
    const router = useRouter();
    const { items, removeItem } = useCartStore();

    const [isMounted, setIsMounted] = React.useState(false);

    //...
}