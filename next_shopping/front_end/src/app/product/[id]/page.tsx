"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { getProductDetail, ProductDetailResponse } from '@/lib/api/product/product';



export default function Page() {
    const params = useParams();
    const productId  = params.id as string;

    const [ loading, setLoading ] = React.useState(true); 
    const [ product, setProduct ] = React.useState<ProductDetailResponse | null >(null);
    const [ selectedImage, setSelectedImage ] = React.useState("");
    const [ selectedOptionid, setSelectedOptionId] = React.useState("");
    
    React.useEffect(()=> {
        if(!productId) return;

        getProductDetail(productId)
            .then((data)=> {
                setProduct(data);
                if(data.images && data.images.length > 0) {
                    setSelectedImage(data.images[0].image_url)
                }
                if(data.options && data.options.length > 0) {
                    setSelectedOptionId(data.options[0].id);
                }
            })
            .catch((err) => {
                return console.log(err);
            })
            .finally(()=> {
                setLoading(false)
            })
        },[productId]);

        if(loading) {
            //...
        }

}