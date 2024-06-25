"use client"
import React from 'react';

import { onClickTest } from "@/shopping/prisma/test"


export default function ShoppingPage() {
    React.useEffect(()=> {
        
    },[])

    return (
        <div className="flex container m-20 mx-auto h-auto justify-center">
            <div>
                <button onClick={onClickTest}>
                    <h1>
                        Hello
                    </h1>
                </button>

            </div>
        </div>
    )
}