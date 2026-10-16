"use client";

import React from 'react';

import { useModalStore } from '@/zustand/useModalStore';
import { Button, Modal } from '@heroui/react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function PwChangeModal() {
    const { closeModal } = useModalStore();
    const { signout } = useAuth();
    const router = useRouter();

    const onPressSignOut = ()=> {
        signout();
        router.push('/');
        closeModal();
    }
    
    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Heading className='text-ls font-bold '>
                    Password Changed
                </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col items-start '>
                    <p>Password Changed Successfully.</p>
                    <p>Please sign in again to secure your account.</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    onPress={onPressSignOut}
                    className='bg-black'>
                    Sign Out
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    )

}