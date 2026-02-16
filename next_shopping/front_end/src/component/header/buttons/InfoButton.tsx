"use client";

import LoginModal from '@/component/modal/LoginModel';
import { useModalStore } from '@/zustand/useModalStore';
import { UserIcon } from '@heroicons/react/24/outline'
import { Button, Modal, Popover } from '@heroui/react';
import React from 'react';

export default function InfoButton() {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const { openModal, closeModal } = useModalStore();

    const onClickSignIn = ()=> {
        
        setPopoverOpen(false)
        openModal(<LoginModal />)   
    }
    
    return (
        <>
        
            <Popover>
                <Button variant='outline' isIconOnly>
                    <UserIcon />
                </Button>
                <Popover.Content className="max-w-64">
                    <Popover.Arrow />
                    <Popover.Dialog>
                        <Popover.Heading className='text-center'>
                            User Profile    
                        </Popover.Heading>
                        <div className='flex flex-row gap-2 mt-2'>
                            <Button variant='outline' size='sm' fullWidth onPress={()=>onClickSignIn()}>
                                <p className='text-xs'>Sign In</p>
                            </Button>
                            <Button variant='outline' size='sm' fullWidth>
                                <p className='text-xs'>Sign Up</p>
                            </Button>
                        </div>
                    </Popover.Dialog>
                </Popover.Content>
            </Popover>
        </>
    )
}