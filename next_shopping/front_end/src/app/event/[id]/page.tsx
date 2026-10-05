
import { Button, Spinner } from '@heroui/react';
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
                    These are events that no longer exist or have ended.
                </p>
                <Button 
                    variant='ghost'
                    onClick={()=>router.back()}>
                    back to previous page
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
        <>
        
        </>
    )
}