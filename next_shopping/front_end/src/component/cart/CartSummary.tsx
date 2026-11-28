'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@heroui/react';
import { CartItem } from '@/zustand/useCartStore';

interface CartSummaryProps {
    items: CartItem[];
    isLoggedIn? : boolean,
    onProceedCheckOut? : (items : CartItem[]) => void; 
}

export default function CartSummary({ items, isLoggedIn, onProceedCheckOut }: CartSummaryProps) {
    const router = useRouter();

    const totalOriginalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const totalDiscountedPrice = items.reduce(
        (acc, item) => acc + item.discounted_price * item.quantity,
        0
    );
    const totalDiscountAmount = totalOriginalPrice - totalDiscountedPrice;

    const shippingFee =
        totalDiscountedPrice === 0 || totalDiscountedPrice >= 50000 ? 0 : 3000;
    const finalPaymentAmount = totalDiscountedPrice + shippingFee;

    const handleOrderClick = () => {
        if(items.length === 0) return;

        onProceedCheckOut?.(items);

        if(!isLoggedIn) {
            //...
            router.push('/checkout')
        }
    }

    return (
        <Card className="bg-white shadow-sm rounded-2xl sticky top-6 border border-gray-100">
            <Card.Header className="pb-3 border-b border-gray-100">
                <Card.Title className="text-lg font-bold text-yellow-500">
                    Result
                </Card.Title>
            </Card.Header>

            <Card.Content className="pt-4">
                <div className="flex flex-col gap-3 text-sm text-gray-600 mb-2">
                    <div className="flex justify-between">
                        <span>Order Amount</span>
                        <span className="font-semibold text-gray-800">
                            + ${totalOriginalPrice.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="font-semibold text-amber-600">
                            - ${totalDiscountAmount.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="font-semibold text-gray-800">
                            + ${shippingFee.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-dashed border-gray-200 text-base font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-xl text-amber-600">
                            ${finalPaymentAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </Card.Content>

            <Card.Footer className="pt-2">
                <div className="w-full flex flex-col gap-2">
                    <Button
                        isDisabled={items.length === 0}
                        className="bg-yellow-400 w-full font-bold text-black"
                        onPress={() => alert('주문 결제 페이지로 이동합니다!')}
                    >
                        ${finalPaymentAmount.toLocaleString()} Order
                    </Button>
                    <Button
                        variant="tertiary"
                        className="w-full font-medium text-gray-700"
                        onPress={() => router.push('/')}
                    >
                        More Shopping
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
}