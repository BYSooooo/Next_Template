'use client';

import { CartItem } from '@/zustand/useCartStore';
import { Button, Card } from '@heroui/react';
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
                <h3 className='text-lg font-bold text-yellow-500 mb-4 pb-3 border-b border-gray-100'>
                    Result
                </h3>
                <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6">
                    <div className="flex justify-between">
                        <span>Order Amount</span>
                        <span className="font-semibold text-gray-800">+{totalOriginalPrice.toLocaleString()} Won</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="font-semibold text-amber-600">-{totalDiscountAmount.toLocaleString()} Won</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="font-semibold text-gray-800">
                            +{shippingFee === 0 ? '0 Won' : `${shippingFee.toLocaleString()} Won`}
                        </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-dashed border-gray-200 text-base font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-xl text-amber-600">{finalPaymentAmount.toLocaleString()} Won</span>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer>
                <div className='w-full flex flex-col gap-2'>
                    <Button
                        className="bg-yellow-400 w-full font-bold text-black">
                        {finalPaymentAmount.toLocaleString()} Won Order
                    </Button>
                    <Button>
                        More Shopping
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}