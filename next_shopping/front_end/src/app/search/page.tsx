"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ProductDetailResponse } from '@/lib/api/product/product';

const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState<ProductDetailResponse[]>([]);
    const [sortBy, setSortBy] = React.useState<'popular' | 'low-price' | 'high-price'>('popular');

    React.useEffect(()=> {
        setLoading(true);

        // TODO: Search Logic
        const timer = setTimeout(()=> {
            setLoading(false)
        }, 400);

        return () => clearTimeout(timer)
    },[query, sortBy])

    return (
        <div className='max-w-6xl mx-auto px-4 py-8 font-sans text-gray-800'>

            <div className='flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-5 mb-8 gap-4'>
                <div>
                    <span className='text-xs font-bold uppercase tracking-wider text-gray-400'>Search Results</span>
                    <h1 className='text-2xl md:text-3xl font-extrabold text-black mt-1'>
                        {query ? (
                            <>
                                Results for <span className='text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-lg'>
                                    &quot;{query}&quot;
                                </span>
                            </>
                        ): (
                            'All Products'
                        )}
                    </h1>
                </div>

                <div className='flex items-center gap-2 text-sm'>
                    <span className='text-gray-500 font-medium'>
                        Sort By:
                    </span>
                    <select 
                        value={sortBy}
                        onChange={(e)=> setSortBy(e.target.value as any)}
                        className='p-2 border border-black rounded-xl bg-white font-semibold text-sm focus:outline-none cursor-pointer'>
                            <option value="popular">Popularity</option>
                            <option value="low-price">Low to High</option>
                            <option value="high-price">Price : High to Low</option>

                    </select>
                </div>
            </div>

            { loading ? (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    {[1,2,3,4,5,6,7,8].map((n)=> (
                        <div key={n} className='animate-pulse space-y-3'>
                            <div className='w-full aspect-square bg-gray-200 rounded-2xl' />
                            <div className='h-4 bg-gray-200 rounded w-3/4'/>
                            <div className='h-4 bg-gray-200 rounded w-1/2'/>
                            
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className='py-20 text-center space-y-4'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-2'>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
                    { products.map((product)=> {
                        const mainImage = product.images?.[0]?.image_url;
                        const discountedPrice = Number(product.discounted_price || product.price)

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className='group flex flex-col bg-white rounded-2xml border border-gray-200 overflow-hidden hover:border-black hover:shadow-lg transition-all duration-200'>
                                <div className='relative w-full aspect-square bg-gray-100 overflow-hidden'>
                                    { mainImage ? (
                                        <img
                                            src={mainImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center text-gray-300 text-xs'>
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className='p-4 flex flex-col justify-between grow space-y-2'>
                                    <div>
                                        <h3 className='text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-black'>
                                            {product.name}
                                        </h3>
                                        { product.subtitle && (
                                            <p className='text-xs text-gray-400 line-clamp-1 mt-0.5'>
                                                {product.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    <div className='pt-2 border-t border-gray-100 flex items-baseline gap-1.5'>
                                        <span className='text-base font-black text-gray-900'>
                                            {formatCurrency(discountedPrice)}
                                        </span>
                                        {product.discount_rate > 0 && (
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
            )}
        </div>
    )
}