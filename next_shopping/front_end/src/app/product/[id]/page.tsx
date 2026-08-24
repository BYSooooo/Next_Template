"use client";

import React from 'react';
import { useParams } from 'next/navigation';

interface CategoryNode {
    id : string;
    name : string;
}

interface ProductImage {
    id : string;
    image_url : string;
    image_type : 'THUMBNAIL' | 'GALLERY' | 'DETAIL'
    sort_order : number;
}

//...

export default function Page() {
    const params = useParams();
    const productId  = params.id as string;
    
    React.useEffect(()=> {
        if(!productId) return;


    },[])

}