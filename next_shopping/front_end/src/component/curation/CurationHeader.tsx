"use client";

import React from 'react';

interface CurationHeaderProps {
    title : string;
    subtitle? : string;
    bannerUrl : string;
}

export default function CurationHeader({title, subtitle, bannerUrl} : CurationHeaderProps) {
    return (
        <div className='space-y-4'>
            <div className='relative w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-100 shadow-inner'>
                { bannerUrl ? (
                    <img 
                        src={bannerUrl}
                        alt={title}
                        className='w-full h-full object-cover'/>    
                ) : (
                    <div className='w-full h-full bg-yellow-400 flex items-center justify-center font-black text-2xl md:text-4xl text-black px-4 text-center'>
                        {title}
                    </div>
                )}
            </div>

            <div className='space-y-2 pt-2'>
                <h1 className='text-2xl md:text-3xl font-extrabold text-black'>
                    {title}
                </h1>
                { subtitle && (
                    <p className='text-sm md:text-base text-gray-600'>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    )
}