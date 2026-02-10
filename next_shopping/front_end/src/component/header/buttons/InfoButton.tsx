"use client";

import { UserIcon } from '@heroicons/react/24/outline'
import { Button, Popover } from '@heroui/react';

export default function InfoButton() {

    return (
        <Popover>
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
                        <Button variant='outline' size='sm' fullWidth >
                            <p className='text-xs'>Sign In</p>
                        </Button>
                        <Button variant='outline' size='sm' fullWidth>
                            <p className='text-xs'>Sign Up</p>
                        </Button>
                    </div>
                </Popover.Dialog>
            </Popover.Content>
        </Popover>
    )
}