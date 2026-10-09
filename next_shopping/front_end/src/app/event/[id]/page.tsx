
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button, Chip, Spinner } from '@heroui/react';
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
    ) || []

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
            </div>

            <div className='space-y-2 pt-2'>
                <div className='flex items-center gap-2'>
                    <Chip className='bg-yellow-400 text-black font-extrabold text-xs px-2 rounded-md'>
                        SPECIAL EVENT
                    </Chip>
                </div>
            </div>
        </div>
    )
}