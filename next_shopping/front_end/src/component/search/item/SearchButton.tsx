"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

export default function SearchButton() {
    const onClickSearch = ()=> {
        alert("Hello")
    }

    return (
        <Button 
            onPress={onClickSearch}
            size="lg" 
            className="h-14 px-6 md:px-8 bg-black text-white font-bold text-base md:text-lg rounded-2xl shadow-md hover:bg-zinc-800 active:scale-95 transition-all">
            <MagnifyingGlassIcon className="text-white text-bold"/>
            Search
        </Button>
    )
}