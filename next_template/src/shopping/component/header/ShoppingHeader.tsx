import React from 'react'
import { Button, Input, Link } from "@nextui-org/react";

export default function ShoppingHeader() {
    return (
        <div className="flex px-3 gap-2 mt-16">
            <Link className="hover:cursor-pointer">
                <h1 className="text-4xl text-slate-800 dark:text-green-400 font-sans font-thin">
                    BuyForAll
                </h1>
            </Link>
            <Input
                label="Test" 
                placeholder='Test' />
            <Button type='button' />
        </div>
    )
}