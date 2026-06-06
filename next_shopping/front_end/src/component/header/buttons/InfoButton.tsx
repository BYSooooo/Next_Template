"use client";

import LoginModal from '@/component/common/modal/LoginModal';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useModalStore } from '@/zustand/useModalStore';
import { useToastStore } from '@/zustand/useToastStore';
import { UserIcon } from '@heroicons/react/24/outline'
import { Button, Popover } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function InfoButton() {
    const [ openYn, setOpenYn ] = React.useState(false)
    const { openModal } = useModalStore();
    const { openToast } = useToastStore()
    const router = useRouter();

    // Check for Sign In or not
    const { isSignIn, user } = useAuthStore()
    const { signout } = useAuth();

    const [isHydrated, setIsHydrated] = React.useState(false)

    React.useEffect(()=> {
        // Check useAuthStore's persist system Ready
        const unsubHydrate = useAuthStore.persist.onHydrate(()=> setIsHydrated(false));
        const unsubFinishHydrate = useAuthStore.persist.onFinishHydration(()=> setIsHydrated(true))

        // already Finished Hydrated, change state 'true'
        if(useAuthStore.persist.hasHydrated()){
            setIsHydrated(true)
        }

        return ()=> {
            unsubHydrate(),
            unsubFinishHydrate()
        }
    },[])

    const onPressSignIn = ()=> {
        setOpenYn(false)
        openModal(<LoginModal />, "lg")   
    }
    
    const onPressSignUp = ()=> {
        setOpenYn(false)
        router.push("/member/signup")
    }

    //...
    if(!isHydrated) {
        return (
            <Button>
                
            </Button>
        )
    }

    const onPressUserInfo = ()=> {
        
    }
    
    return (
        <>
            <Popover isOpen={openYn} onOpenChange={setOpenYn}>
                <Popover.Trigger>
                    <Button variant='outline' isIconOnly onPress={()=>setOpenYn(true)}>
                        <UserIcon />
                    </Button>
                </Popover.Trigger>
                <Popover.Content className="max-w-64">
                    <Popover.Arrow />
                    { isSignIn && isHydrated
                        ?   <Popover.Dialog>
                                <Popover.Heading className='text-left'>
                                    Hello { user?.nickname }!
                                </Popover.Heading>
                                
                                <Button variant='outline' size='sm' fullWidth onPress={onPressUserInfo}>
                                    <p className='text-xs'>User Info</p>
                                </Button>
                                <Button variant='danger-soft' size='sm' fullWidth onPress={()=>signout()}>
                                    <p className='text-xs'>Sign Out</p>
                                </Button>
                            </Popover.Dialog>
                        : <Popover.Dialog>
                                <Popover.Heading className='text-left'>
                                    Hello Guest!    
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
                        
                    }
                </Popover.Content>
            </Popover>
        </>
    )
}