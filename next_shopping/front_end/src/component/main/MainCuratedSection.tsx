"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface ProductItem {
    id : string;
    name : string;
    subtitle? : string;
    price : number;
    discount_rate : number;
    discounted_price : number;
    images : { image_url : string }[]
};

interface CuratedSectionProps {
    promotion : {
        id : string;
        title : string;
        subtitle? : string;
        products : ProductItem[]
    }
}

const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function MainCurratedSection({ promotion } : CuratedSectionProps) {
    return (
        <section className='w-full max-w-7xl mx-auto px-6 space-y-4'>
            
            <div className='flex items-end justify-between'>
                <div>
                    <h2 className='text-2xl font-extrabold text-black'>
                        {promotion.title}
                    </h2>
                    {promotion.subtitle && (
                        <p className='text-sm text-gray-500 mt-0.5'>
                            {promotion.subtitle}
                        </p>
                    )}
                </div>
                <Link 
                    href={`/curation/${promotion.id}`}
                    className='flex items-center gap-1 text-sm font-bold text-black hover:text-yellow-600 transition-colors'>
                    View More <ArrowRightIcon className='w-4 h-4'/>
                </Link>
            </div>

            <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-none'>
                { promotion.products.map((product)=> {
                    const mainImage = product.images?.[0]?.image_url;

                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="group flex-shrink-0 w-60 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-black hover:shadow-lg transition-all duration-200"
                        >
                            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                                {mainImage ? (
                                    <img
                                        src={mainImage}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                        No Image
                                    </div>
                                )}
                                {product.discount_rate > 0 && (
                                    <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-extrabold px-2 py-1 rounded-md shadow-sm">
                                        {product.discount_rate}% OFF
                                    </span>
                                )}
                            </div>

                            <div className="p-4 flex flex-col justify-between space-y-2">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 truncate">
                                        {product.name}
                                    </h3>
                                    {product.subtitle && (
                                        <p className="text-xs text-gray-400 truncate">
                                            {product.subtitle}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-2 border-t border-gray-100 flex items-baseline gap-1.5">
                                    <span className="text-base font-black text-gray-900">
                                        {formatCurrency(Number(product.discounted_price || product.price))}
                                    </span>
                                    {product.discount_rate > 0 && (
                                        <span className="text-xs text-gray-400 line-through">
                                            {formatCurrency(Number(product.price))}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}