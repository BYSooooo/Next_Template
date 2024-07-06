import React from 'react'
import { Input, Link, Textarea } from "@nextui-org/react";

export default function ShoppingHeader() {
    return (
        <div className="flex px-3 gap-2 mt-16">
            <Link className="hover:cursor-pointer">
                <h1 className="text-4xl text-slate-800 font-sans font-thin">
                    BuyForAll
                </h1>
            </Link>
        </div>
    )
}