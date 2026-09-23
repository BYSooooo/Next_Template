"use client";
import React from 'react';
import { Input } from "@heroui/react";

interface SearchFieldProps {
    keyword : string;
    setKeyword : (value:string)=> void
    onSearch: ()=> void
}

export default function SearchField({keyword, setKeyword, onSearch} : SearchFieldProps) {

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onSearch()
        }
    }

    return (
        <Input 
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Search keyword'
            fullWidth
            className="h-14 bg-white text-black text-lg font-medium rounded-2xl px-4 focus:outline-none focus:ring-0 placeholder:text-gray-400"
            />
    )
}