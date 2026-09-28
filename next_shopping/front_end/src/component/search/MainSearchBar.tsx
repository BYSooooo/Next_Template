'use client';

import React from 'react';

import SearchButton from "./item/SearchButton";
import SearchField from "./item/SearchField";
import { useRouter, useSearchParams } from 'next/navigation';

export default function MainSearchBar() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = React.useState(searchParams.get("q") || "");

    const handleSearch = ()=> {
        if (!keyword.trim()) return;
        router.push(`/search?q=${encodeURIComponent(keyword.trim())}`)
    }

    return (
        <section className="w-full bg-yellow-400 ">
            <div className="inner-container flex justify-center py-6 px-4 md:py-8">
                <div className="flex items-center gap-2.5 md:gap-3 w-full max-w-4xl">
                    {/* Logo Area */}
                    <div className="flex-none h-14 w-24 md:w-32 flex items-center justify-center bg-black text-white rounded-2xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
                        <span className="font-extrabold tracking-tighter text-lg md:text-xl">
                            LOGO
                        </span>
                    </div>

                    <div className="grow min-w-0">
                        <SearchField 
                            keyword={keyword}
                            setKeyword={setKeyword}
                            onSearch={handleSearch}/>
                    </div>

                    <div className="flex-none">
                        <SearchButton onSearch={handleSearch}/>
                    </div>

                </div>

            </div>
        </section> 
    )
}