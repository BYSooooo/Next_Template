"use client";

import LoginModal from '@/component/common/LoginModal';
import { UserIcon } from '@heroicons/react/24/outline'
import { Button, Modal, Popover } from '@heroui/react';
import React from 'react';

export default function InfoButton() {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [modelOpen, setModalOpen] = React.useState(false);

    const onClickSignIn = ()=> {
        setPopoverOpen(false)
        setModalOpen(true)
    }
    
    return (
        <>
        
            <Popover isOpen={popoverOpen}>
                <Button variant='outline' isIconOnly >
                    <UserIcon />
                </Button>
                <Popover.Content className="max-w-64">
                    <Popover.Arrow />
                    <Popover.Dialog>
                        <Popover.Heading className='text-center'>
                            User Profile    
                        </Popover.Heading>
                        <div className='flex flex-row gap-2 mt-2'>
                            <Modal>
                                <Button variant='outline' size='sm' fullWidth>
                                    <p className='text-xs'>Sign In</p>
                                    <LoginModal />
                                </Button>
                            </Modal>
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