'use client';

import React from 'react';
import { Button, Checkbox, Table, type Selection } from '@heroui/react';
import { CartItem, useCartStore } from '@/zustand/useCartStore';

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
                        <Table.Body>
                            {items.map((item)=> {
                                const thumbnailImage = item.images && item.images.length > 0
                                    ? item.images[0].image_url
                                    : 'https://picsum.photos/seed/fallback/200/200';
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
                                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0'>
                                                    <img 
                                                        src={thumbnailImage}
                                                        alt={item.name}
                                                        className='w-full h-full object-cover select-none'
                                                    />
                                                </div>
                                                <div className='flex flex-col min-w-0'>
                                                    {item.subtitle && (
                                                        <span className='text-xs text-gray-400 truncate'>

                                                        </span>
                                                    )}
                                                </div>
                                            </div>
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