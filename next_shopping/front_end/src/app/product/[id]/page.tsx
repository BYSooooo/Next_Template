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
                            {product.images.length > 1 && (
                                <div className='flex gap-2 overflow-x-auto pb-2'>
                                    {product.images.map((image)=> (
                                        <button 
                                            key={image.id}
                                            onClick={()=> setSelectedImage(image.image_url)}
                                            className={`w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 ${
                                                selectedImage === image.image_url ? 'border-black' : 'border-gray-200'
                                            }`}
                                            >
                                            <img 
                                                src={image.image_url}
                                                alt="Thumbnail"
                                                className='w-full h-full object-cover'/>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col justify-between'>
                            <div className='space-y-4'>
                                {product.delivery_type === 'EARLY_MORNING' && (
                                    <span className='inline-block bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded'>
                                        Early Delivery
                                    </span>
                                )}
                                <div className='text-2xl font-bold text-gray-900'>
                                    {product.name}
                                </div>

                                <div className='border-b border-gray-100 pb-4'>
                                    <div className='flex- items-baseline gpa-2'>
                                        {product.discount_rate > 0 && (
                                            <span className="text-2xl font-extrabold text-red-500">
                                                {product.discount_rate}% 
                                            </span>
                                        )}
                                        <span className='text-3xl font-extrabold text-gray-900'>
                                            {unitPrice.toLocaleString()}
                                        </span>
                                        {product.discount_rate > 0 && (
                                            <span className='text-sm text-gray-400 line-through'>
                                                {(product.price + additionalPrice).toLocaleString()}Won
                                            </span>
                                        )}
                                    </div>
                                </div>

                                { product.origin && (
                                    <div className='text-xs text-gray-500'>
                                        Country of Origin : <span className='font-medium text-gray-700'> 
                                            {product.origin}
                                        </span>
                                    </div>
                                )}

                                { product.options && product.options.length > 0 && (
                                    <div className='space-y-2 pt-2'>
                                        <label className='block text-sm font-semibold text-gray-700'>Select</label>
                                        <select
                                            value={selectedOptionid}
                                            onChange={(e)=> setSelectedOptionId(e.target.value)}
                                            className='w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2'>
                                            {product.options.map((option)=> (
                                                <option key={option.id} value={option.id}>
                                                    {option.option_name}
                                                    {option.additional_price > 0 ? ` (+${option.additional_price.toLocaleString()}Won)` : ''}

                                                </option>
                                            ))}

                                        </select>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )

}