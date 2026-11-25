'use client';

import React from 'react';
import { Button, Checkbox, Table, type Selection } from '@heroui/react';
import { CartItem, useCartStore } from '@/zustand/useCartStore';
import { useRouter } from 'next/navigation';

interface CartItemTableProps {
    items : CartItem[];
    selectedKeys : Selection;
    onSelectionChange : (keys : Selection) => void;
}

export default function CartTable({items, selectedKeys, onSelectionChange} : CartItemTableProps) {
    
    const updatedQuantity = useCartStore((state)=> state.updateQuantity);
    const removeItem = useCartStore((state)=> state.removeItem);
    const clearCart = useCartStore((state)=> state.clearCart)

    const handleRemoveSelected = ()=> {
        if(selectedKeys === 'all') {
            clearCart();
            onSelectionChange(new Set());
            return;
        }

        selectedKeys.forEach((key)=> {
            removeItem(String(key))
        });

        onSelectionChange(new Set())
    };

    const selectedCount = selectedKeys === 'all' 
        ? items.length
        : selectedKeys.size;
    
    const router = useRouter();
    
    return (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
                <span className='text-sm font-bold text-gray-900'>
                    Selected Item{''}
                    <span className='text-amber-500'>
                        ({selectedCount} / {items.length})
                    </span>
                </span>
                <Button 
                    size='sm'
                    variant='tertiary'
                    isDisabled={selectedCount === 0}
                    onPress={handleRemoveSelected}
                    className="text-xs font-medium text-gray-600">
                    Clear Selection
                </Button>
            </div>

            <Table >
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label='Item List'
                        selectionMode='multiple'
                        selectedKeys={selectedKeys}
                        onSelectionChange={onSelectionChange}>
                        <Table.Header>
                            <Table.Column className='w-12'>
                                <Checkbox aria-label='All' slot='selection'/>
                            </Table.Column>
                            <Table.Column isRowHeader>Info</Table.Column>
                            <Table.Column className='w-32 text-center'>Quantity</Table.Column>
                            <Table.Column className='w-32 text-right'>Order Amount</Table.Column>
                            <Table.Column className="w-16 text-center">Delete</Table.Column>
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={()=> (
                                <div className='py-14 px-6 flex flex-col items-center justify-center text-center gap-3'>
                                    <p className='text-lg font-extrabold text-gray-900'>
                                        There are no items in the cart.
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        Enjoy Shopping!
                                    </p>
                                    <Button
                                        className="bg-yellow-400 font-bold text-black mt-2"
                                        onPress={()=>router.push("/")}>
                                        
                                        Go to Shopping
                                    </Button>
                                </div>
                            )}>
                            {items.map((item)=> {
                                const thumbnail = item.images && item.images.length > 0
                                    ? item.images[0].image_url
                                    : 'https://picsum.photos/seed/fallback/200/200';

                                const matchedOption = item.options?.find((opt)=> opt.id === item.selectedOptionId);
                                
                                return (
                                    <Table.Row key={item.id} id={item.id}>
                                        <Table.Cell>
                                            <Checkbox 
                                                aria-label={`${item.name} select`}
                                                slot='selection'
                                            />
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className='flex items-center gap-3 py-1'>
                                                
                                                <img 
                                                    src={thumbnail}
                                                    alt={item.name}
                                                    className='w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0'
                                                />
                                                <div className='flex flex-col min-w-0 gap-1'>
                                                    {item.delivery_type === "EARLY_MORNING" && (
                                                        <span className='text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit'>
                                                            Early Delivery
                                                        </span>
                                                    )}
                                                    
                                                    <span className='text-sm font-bold text-gray-900 truncate'>
                                                        {item.name}
                                                    </span>
                                                    
                                                    {item.subtitle && (
                                                        <span className='text-xs text-gray-400 truncate'>
                                                            {item.subtitle}
                                                        </span>
                                                    )}

                                                    {(matchedOption || item.selectedOptionId) && (
                                                        <span className='text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded w-fit border border-amber-200/60'>
                                                            Option : {" "}
                                                            {matchedOption 
                                                                ? matchedOption.option_name
                                                                : item.selectedOptionId
                                                            }
                                                        </span>
                                                    )}

                                                    <span className='text-xs te-g-500'>
                                                        Unit : ${Number(item.discounted_price).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className='text-center'>
                                            <div className='inline-flex items-center border border-gray-200 rounded-4xl bg-gray-50'>
                                                <Button
                                                    size='sm' 
                                                    variant='outline'
                                                    isIconOnly
                                                    isDisabled={item.quantity <= 1}
                                                    onPress={()=> updatedQuantity(item.id, -1)}
                                                    className='text-xs font-bold text-gray-600'>
                                                    -
                                                </Button> 
                                                <span className='px-2.5 py-1 text-xs font-semibold'>
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    size='sm'
                                                    variant='outline' 
                                                    isIconOnly
                                                    onPress={()=> updatedQuantity(item.id, 1)}
                                                    className='text-xs font-bold text-gray-600'>
                                                    <p className='font-bold'>
                                                        +
                                                    </p>
                                                </Button>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="text-right font-extrabold text-gray-900">
                                            $ {(item.discounted_price * item.quantity).toLocaleString()}
                                        </Table.Cell>
                                        
                                        <Table.Cell className="text-center">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onPress={() => removeItem(item.id)}
                                                className="text-xs text-gray-500 min-w-0 px-2">
                                                ✕
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}

                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    )
}