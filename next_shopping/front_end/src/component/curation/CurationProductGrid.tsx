"use client";

import React from 'react';
import Link from 'next/link';
import { Pagination } from '@heroui/react';

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

                    </div>
                </>
            )}
        </div>
    )
}