'use client';

import { CartItem } from '@/zustand/useCartStore';
import { Card } from '@heroui/react';
import Reect from 'react';

interface CartSummaryProps {
    items : CartItem[]
}

export default function CartSummary({ items } : CartSummaryProps) {
    const totalOriginalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalDiscountedPrice = items.reduce((acc, item) => acc + item.discounted_price * item.quantity, 0);
    const totalDiscountAmount = totalOriginalPrice - totalDiscountedPrice;

    const shippingFee = totalDiscountAmount > 50000 || totalDiscountedPrice === 0 ? 0 : 3000;
    const finalPaymentAmount = totalDiscountAmount + shippingFee;

    return (
        <Card className='bg-white shadow-sm rounded-2xl sticky top-6 border border-gray-100'>
            <Card.Content>
                <h3 className='text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100'>
                    Estimated payment amount
                </h3>
                <div>
                    
                </div>
            </Card.Content>
        </Card>
    )
}