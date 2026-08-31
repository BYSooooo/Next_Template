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
    const [ quantity, setQuantity ] = React.useState<number>(1);
    const [ activeTab, setActiveTab ] = React.useState<'deatil' | 'review' | 'qna' | 'delivery'>('deatil');

    React.useEffect(()=> {
        if(!productId) return;

        getProductDetail(productId)
            .then((data)=> {
                if(!data) return;

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
            return <div className="p-12 text-center text-gray-500 font-medium">Loading...</div>
        }

        if(!product) {
            return <div className='p-12 text-center text-red-500 font-bold'>Can not found Product Info</div>
        }

        const selectedOption = product.options.find((option)=> option.id === selectedOptionid) || product.options[0];
        const additionalPrice = selectedOption ? selectedOption.additional_price : 0;
        
        const unitPrice = product.discount_rate + additionalPrice;
        const totalPrice = unitPrice * quantity;

        const handleQuantityChange = (type: 'plus' | 'minus') => {
            if(type === 'minus' && quantity > 1) {
                setQuantity((prev) => prev - 1);
            } else if (type === 'plus' && quantity < product.stock_quantity) {
                setQuantity((prev) => prev + 1);
            }
        };

        return (
            <div className='max-w-6xl mx-auto px-4 py-8 text-gray-800 font-sans'>
                <nav className='text-xs text-gray-500 mb-6 flex items-center gap-2'>
                    {product.category_path.map((cat, idx)=> (
                        <React.Fragment key={cat.id}>
                            { idx > 0 && <span>&gt;</span>}
                            <span className={idx === product.category_path.length - 1 ? 'font-bold text-gray-800' : '' }>
                                {cat.name}
                            </span>
                        </React.Fragment>
                    ))}
                </nav>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-16'>

                    <div className='space-y-4'>
                        <div className='w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200'>
                            {selectedImage ? (
                                <img 
                                    src={selectedImage}
                                    alt={product.name}
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                                    No Image
                                </div>  

                            )}
                            {//...
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

}