"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button, Spinner } from '@heroui/react';
import CurationHeader from '@/component/curation/CurationHeader';
import CurationProductGrid from '@/component/curation/CurationProductGrid';
import { getCurationDetail } from '@/lib/api/curation/curation';

interface ProductItem {
    id: string;
    name: string;
    subtitle?: string;
    price: number;
    discount_rate: number;
    discounted_price: number;
    images: { image_url: string }[];
}

interface CurationDetail {
    id: string;
    title: string;
    subtitle?: string;
    banner_url?: string;
    products: ProductItem[];
}

export default function CurationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const curationId = params?.id as string;

    const [curation, setCuration] = useState<CurationDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!curationId) return;

        const loadCurationData = async () => {
            setLoading(true);
            const data = await getCurationDetail(curationId);
            setCuration(data);
            setLoading(false);
        };

        loadCurationData();
    }, [curationId]);

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
                <Spinner size="lg" color='warning' />
                <p className='text-gray-500 font-medium'>Loading curation...</p>
            </div>
        );
    }

    if (!curation) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
                <p className='text-xl font-bold text-gray-700'>
                    This curation does not exist or has ended.
                </p>
                <Button variant='primary' onClick={() => router.back()}>
                    Return to Previous Page
                </Button>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-8 space-y-8'>
            
            <div className='flex items-center justify-between'>
                <Button 
                    isIconOnly
                    variant='ghost'
                    onClick={() => router.back()}>
                    <ArrowLeftIcon className="w-5 h-5" />
                </Button>
            </div>

            <CurationHeader 
                title={curation.title}
                subtitle={curation.subtitle}
                bannerUrl={curation.banner_url}
            />

            <hr className='border-gray-200' />

            <CurationProductGrid 
                products={curation.products || []}
            />
        </div>
    );
}