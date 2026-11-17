"use client";

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';


export default function CartButton() {
    const router = useRouter();

    return (
        <Button 
            variant='outline' 
            isIconOnly
            onClick={()=>router.push('/cart')}>
            <ShoppingCartIcon />
        </Button>
    )

}