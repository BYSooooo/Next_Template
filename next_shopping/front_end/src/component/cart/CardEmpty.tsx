"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { Button, Card } from '@heroui/react';

export default function CartEmpty() {
    const router = useRouter();

    return (
        <Card className="w-full bg-white shadow-sm rounded-2xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center">
            <Card.Title className='text-xl font-extrabold'>
                There are no items in the cart.
            </Card.Title>
            <Card.Content>
                Enjoy Shopping!
            </Card.Content>
            <Card.Footer>
                <Button 
                    variant='primary'
                    onClick={()=> router.push('/')}>
                    Go to Shopping
                </Button>
            </Card.Footer>
        </Card>
    )
}