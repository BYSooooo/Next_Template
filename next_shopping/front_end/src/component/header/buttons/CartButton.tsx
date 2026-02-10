"use client";

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Button } from '@heroui/react';


export default function CartButton() {
    

    return (
        <Button variant='outline' isIconOnly >
            <ShoppingCartIcon />
        </Button>
    )

}