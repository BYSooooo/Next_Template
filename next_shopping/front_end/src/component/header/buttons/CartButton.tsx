"use client";

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';


export default function CartButton() {
    const router = useRouter();

    const onPressCart = ()=> {

    }

    return (
        <Button variant='outline' isIconOnly onPress={}>
            <ShoppingCartIcon />
        </Button>
    )

}