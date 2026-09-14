"use client";
import React from 'react';
import { Input } from "@heroui/react";

export default function SearchField() {

    const [keyword, setKeyword] = React.useState("");
    
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            alert(`Keyword : ${keyword}`)
        }
    }

    return (
        <Input 
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            className="h-14 bg-white text-black text-lg font-medium rounded-2xl px-4 focus:outline-none focus:ring-0 placeholder:text-gray-400"
            />
    )
}