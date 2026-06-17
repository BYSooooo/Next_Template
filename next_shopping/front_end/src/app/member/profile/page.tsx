"use client";

import React from 'react';

import { Avatar, Card, Description, Label, ListBox, Separator, Surface } from "@heroui/react";
import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';
import AvatarCard from '@/component/profile/AvatarCard';
import InfoOneCard from '@/component/profile/InfoOneCard';
import AddressCard from '@/component/profile/AddressCard';
import { EnvelopeIcon, HashtagIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';


export default function Page() {
    const router = useRouter();
    const { user } = useAuthStore();


    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <Card className='bg-gray-100 rounded-lg w-2/3'>
                <Card.Header>
                    <p className='font-bold text-3xl'>
                        Profile
                    </p>
                </Card.Header>
                <Card.Content className='flex flex-row gap-4'>
                    <Surface 
                        variant='transparent'
                        className='rounded-xl'>
                        <ListBox selectionMode='single' className='w-fit'>
                            <ListBox.Item>
                                <Avatar className='p-1'>
                                    <UserCircleIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Avatar</Label>
                                    <Description>
                                        Change, Remove Avatar
                                    </Description>
                                </div>
                            </ListBox.Item>
                            <ListBox.Item>
                                <Avatar className='p-1'>
                                    <EnvelopeIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Email</Label>
                                    <Description>
                                        Change, Verify Email Address
                                    </Description>
                                </div>
                            </ListBox.Item>
                            <ListBox.Item>
                                <Avatar className='p-1'>
                                    <HashtagIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Nickname</Label>
                                    <Description>
                                        Check Nickname
                                    </Description>
                                </div>
                            </ListBox.Item>
                            <ListBox.Item>
                                <Avatar className='p-1'>
                                    <KeyIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Password</Label>
                                    <Description>
                                        Change Password
                                    </Description>
                                </div>
                            </ListBox.Item>
                        </ListBox>

                    </Surface>
                </Card.Content>
                <Card.Footer>
                    
                </Card.Footer>
            </Card>
        </div>
    )
}