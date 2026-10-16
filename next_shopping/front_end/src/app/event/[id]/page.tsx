"use client";

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button, Chip, Pagination, Spinner } from '@heroui/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';


interface Product {
    id : string;
    name : string;
    subtitle? : string;
    price : number;
    discount_rate : number;
    discounted_price : number;
    status : 'ON_SALE' | 'SOLD_OUT' | 'HIDDEN';
    images : { image_url : string }[];
}

interface EventDetail {
    id : string;
    title : string;
    description : string;
    banner_url : string;
    start_date : string;
    end_date : string;
    is_active : boolean;
    products : Product[]
}

const formatCurrency = (amount: number)=> {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits : 2, maximumFractionDigits : 2})}`;
}

export default function Page(){

    const params = useParams();
    const router = useRouter();
    const eventId = params?.id as string;

    const [event, setEvent] = React.useState<EventDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = 8;

    React.useEffect(()=> {
        if (!eventId) return;

        const fetchEventDetail = async() => {
            try {
                setLoading(true);
                // NestJS API Call
                const response = await fetch(`/api/event/${eventId}`)
                if (!response.ok) throw new Error('Error : Cannot find event information');

                const data = await response.json();
                setEvent(data)
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchEventDetail();
    },[eventId])

    if(loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
                <Spinner size="lg" color='warning' />
                <p className='text-gray-500 font-medium'>
                    Loading...
                </p>
            </div>
        )
    }

    if(!event) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
                <p className='text-xl font-bold text-gray-700'>
                    This is a non-existent or terminated event.
                </p>
                <Button 
                    variant='danger' 
                    onClick={() => router.back()}>
                    Return to Previous Page.
                </Button>
            </div>
        );
    }

    const totalPages = Math.ceil((event.products?.length || 0) / rowsPerPage);
    const paginatedProducts = event.products?.slice (
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    ) || [];

    return (
        <div className='max-w-7xl mx-auto px-4 py-8 space-y-8'>

            <div className='flex items-center justify-between'>
                <Button 
                    isIconOnly
                    variant='ghost'
                    onClick={()=> router.back()}>
                    <ArrowLeftIcon />
                </Button>
                <Button>
                    
                </Button>
            </div>

            <div className='space-y-4'>
                <div className='relative w-full h-70 md:h-100 rounded-2xm overflow-hidden bg-gray-100 shadow-inner'>
                    { event.banner_url ? (
                       <img 
                            src={event.banner_url}
                            alt={event.title}
                            className='w-full h-full object-cover'
                       /> 
                    ):(
                        <div className='w-full h-full bg-yellow-400 flex items-center justify-center font-black text-2xl md:text-4xl text-black px-4 text-center'>
                            {event.title}
                        </div>
                    )}
                </div>
            

                <div className='space-y-2 pt-2'>
                    <div className='flex items-center gap-2'>
                        <Chip className='bg-yellow-400 text-black font-extrabold text-xs px-2 rounded-md'>
                            SPECIAL EVENT
                        </Chip>
                        <span className="text-xs font-semibold text-gray-500">
                            {event.start_date?.slice(0, 10)} ~ {event.end_date?.slice(0, 10)}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-black">
                        {event.title}
                    </h1>
                    {event.description && (
                        <p className="text-sm md:text-base text-gray-600 whitespace-pre-line leading-relaxed">
                            {event.description}
                        </p>
                    )}
                </div>
            </div>

            <hr className='border-gray-200' />

            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg md:text-xl font-bold text-black'>
                        Event Items 
                        <span className='text-yellow-600 font-extrabold'>
                            ({event.products?.length || 0})
                        </span>
                    </h2>
                </div>
                { paginatedProducts.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:gird-cols-4 gap-4 md:gap-6'>
                        {paginatedProducts.map((product)=> {
                            const mainImage = product.images?.[0]?.image_url;
                            const discountedPrice = Number(product.discounted_price || product.price);

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
                                        ) : (
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

                                    <div className='p-4 flex flex-col justify-between flex-grow space-y-2'>
                                        <div>
                                            <h3 className='text-sm font-bold text-gray-900'>
                                                {product.name}
                                            </h3>
                                            {product.subtitle && (
                                                <p className='text-xs text-gray-400'>
                                                    {product.subtitle}
                                                </p>
                                            )}
                                        </div>

                                        <div className='pt-2 border-t border-gray-100 flex items-baseline gap-1.5'>
                                            <span className='text-base font-black text-gray-900'>
                                                {formatCurrency(Number(product.price))}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ):( 
                    <div className='text-center py-16 bg-gray-50 rounded-2xl border border-gray-100'>
                        <p className='text-sm font-medium text-gray-500'>
                            No products assigned to this event yet.
                        </p>
                    </div>
                )}
            </div>
        </div>

        
    )
}