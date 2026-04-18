"use client";

import LoginModal from '@/component/common/modal/LoginModal';
import { useModalStore } from '@/zustand/useModalStore';
import { UserIcon } from '@heroicons/react/24/outline'
import { Button, Popover } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function InfoButton() {
    const [ openYn, setOpenYn ] = React.useState(false)
    const { openModal } = useModalStore();
    const router = useRouter();

    const onPressSignIn = ()=> {
        setOpenYn(false)
        openModal(<LoginModal />, "lg")   
    }

    const onPressSignUp = ()=> {
        setOpenYn(false)
        router.push("/member/signup")
    }
    
    return (
        <>
            <Popover isOpen={openYn}>
                <Button variant='outline' isIconOnly onPress={()=>setOpenYn(true)}>
                    <UserIcon />
                </Button>
                <Popover.Content className="max-w-64">
                    <Popover.Arrow />
                    <Popover.Dialog>
                        <Popover.Heading className='text-center'>
                            User Profile    
                        </Popover.Heading>
                        <div className='flex flex-row gap-2 mt-2'>
                            <Button variant='outline' size='sm' fullWidth onPress={()=>onPressSignIn()}>
                                <p className='text-xs'>Sign In</p>
                            </Button>
                            <Button variant='outline' size='sm' fullWidth onPress={()=> onPressSignUp()}>
                                <p className='text-xs'>Sign Up</p>
                            </Button>
                        </div>
                    </Popover.Dialog>
                </Popover.Content>
            </Popover>
        </>
    )
}