"use client";

import React from 'react';
import Link from 'next/link';
import { Pagination } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ProductItem {
    id : string;
    name : string;
    subtitle? : string;
    price : number;
    discount_rate : number;
    discounted_price : number;
    images : { image_url : string }[];
}

interface CurationProductGridProps {
    products: ProductItem[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function CurattionProductGrid({
    products,
    page,
    totalPages,
    onPageChange
} : CurationProductGridProps) {
    
    const rowsPerPage = 8;
    const paginatedProducts = products.slice((page - 1) * rowsPerPage, page * rowsPerPage );

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg md:text-xl font-bold text-black'>
                    Curated Items
                    <span className='text-yellow-600 font-extrabold ml-1'>
                        ({products.length})
                    </span>
                </h2>
            </div>
            { paginatedProducts.length > 0 ? (
                <>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6'>
                        {paginatedProducts.map((product)=> {
                            const mainImage = product.images?.[0]?.image_url;

                            return (
                                <Link 
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className='group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-black hover:shadow-lg transition-all duration-200'>
                                    <div className='relative w-full aspect-square bg-gray-100 overflow-hidden'>
                                        {mainImage ? (
                                            <img
                                                src={mainImage}
                                                alt={product.name}
                                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                            />
                                        ): (
                                            <div className='w-full h-full flex items-center justify-center text-gray-400 text-xs'>
                                                No Image
                                            </div>
                                        )}
                                        {product.discount_rate > 0 && (
                                            <span className='absolute top-2 left-2 bg-yellow-400 text-black text-xs font-extrabold px-2 py-1 rounded-md shadow-sm'>
                                                {product.discount_rate}% OFF
                                            </span>
                                        )}
                                    </div>

                                    <div className='p-4 flex flex-col justify-between grow space-y-2'>
                                        <div>
                                            <h3 className='text-sm font-bold text-gray-900 truncate'>
                                                {product.name}
                                            </h3>
                                            {product.subtitle && (
                                                <p className='text-xs text-gray-400 truncate'>
                                                    {product.subtitle}
                                                </p>
                                            )}
                                        </div>

                                        <div className='pt-2 border-t border-gray-100 flex items-baseline gap-1.5'>
                                            <span className='text-base font-black text-gray-900'>
                                                {formatCurrency(Number(product.discounted_price || product.price))}
                                            </span>
                                            { product.discount_rate > 0 && (
                                                <span className='text-xs text-gray-400 line-through'>
                                                    {formatCurrency(Number(product.price))}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    { totalPages > 1 && (
                        <div className='flex items-center justify-center gap-2 pt-8'>
                            <button
                                onClick={() => onPageChange(page -1)}
                                disabled={page === 1}
                                className='p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'>
                                    <ChevronLeftIcon className='w-5 h-5 text-gray-700 '/>
                            </button>

                            <div className='flex items-center gap-1'>
                                {Array.from({ length : totalPages}, (_, i)=> i + 1).map((p)=> (
                                    <button
                                        key={p}
                                        onClick={()=> onPageChange()}
                                        className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                                            page === p 
                                                ? "bg-black text-white"
                                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                                        }`}>
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={()=> onPageChange(page + 1)}
                                disabled={page === totalPages}
                                className='p-2 rounded-lg border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors'>
                                <ChevronRightIcon className='w-5 h-5 text-gray-700'/>
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className='text-center py-16 bg-gray-50 rounded-2xl border border-gray-100'>
                    <p className='text-sm font-medium text-grat-500'>
                        No products are registered in this curation yet.
                    </p>

                </div>
            )}
        </div>
    )
}