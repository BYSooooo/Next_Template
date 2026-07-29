"use client";

import React from 'react';

import { Avatar, Card, Description, Label, ListBox, Surface } from "@heroui/react";
import { useRouter } from 'next/navigation';
import AvatarCard from '@/component/profile/AvatarCard';
import AddressCard from '@/component/profile/AddressCard';
import { EnvelopeIcon, HashtagIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import EmailCard from '@/component/profile/EmailCard';
import NicknameCard from '@/component/profile/NicknameCard';
import PasswordCard from '@/component/profile/PasswordCard';


export default function Page() {
    const router = useRouter();
    
    const [selectCard, setSelectCard] = React.useState('Avatar');

    const onPressProfileMenu = (selected:string)=> {
        setSelectCard(selected);
    }

    const cardHandler = ()=> {
        switch(selectCard) {
            case 'Avatar' : return <AvatarCard />
            case 'Email' : return <EmailCard />
            case 'Address' : return <AddressCard />
            case 'Nickname' : return <NicknameCard />
            case 'Password' : return <PasswordCard />
        }
    }


    return (
        <div className="inner-container flex items-center justify-center min-h-screen py-8 px-4">
            <Card className='bg-gray-100 rounded-lg w-full max-w-3xl'>
                <Card.Header>
                    <p className='font-bold text-3xl'>
                        Profile
                    </p>
                </Card.Header>
                <Card.Content className='flex flex-col md:flex-row gap-6 p-4 md:p-6'>
                    <Surface 
                        variant='transparent'
                        className='rounded-xl w-full md:w-64 shrink-0'>
                        <ListBox 
                            selectionMode='single' className='w-fit'>
                            <ListBox.Item 
                                onPress={()=>onPressProfileMenu('Avatar')}
                                textValue='Avatar'>
                                <Avatar className='p-1'>
                                    <UserCircleIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Avatar</Label>
                                    <Description>
                                        Change, Remove Avatar
                                    </Description>
                                </div>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item 
                                onPress={()=>onPressProfileMenu('Email')}
                                textValue='Email'>
                                <Avatar className='p-1'>
                                    <EnvelopeIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Email</Label>
                                    <Description>
                                        Change, Verify Email Address
                                    </Description>
                                </div>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item 
                                onPress={()=>onPressProfileMenu('Nickname')}
                                textValue='Nickname'>
                                <Avatar className='p-1'>
                                    <HashtagIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Nickname</Label>
                                    <Description>
                                        Check Nickname
                                    </Description>
                                </div>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item 
                                onPress={()=>onPressProfileMenu('Password')}
                                textValue='Password'>
                                <Avatar className='p-1'>
                                    <KeyIcon className='w-full'/>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <Label>Password</Label>
                                    <Description>
                                        Change Password
                                    </Description>
                                </div>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </Surface>
                    <div className='w-full md:w-7/12 lg:w-8/12'>
                        {cardHandler()}
                    </div>
                </Card.Content>
                <Card.Footer>
                    
                </Card.Footer>
            </Card>
        </div>
    )
}