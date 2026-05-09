"use client"

import React from 'react';

import { Card } from "@heroui/react";
import { useRouter } from 'next/navigation';

import { useSignUpStore } from "@/zustand/useSignUpStore";
import { AnimatePresence, motion } from "motion/react";
import EmailStep from '@/component/signup/EmailStep';
import AccountStep from '@/component/signup/AccountStep';
import ContactStep from '@/component/signup/ContactStep';

export default function Page() {
    const { email, step, initStore } = useSignUpStore();

    const router = useRouter();

    const headerSteper = ()=> {
        switch(step) {
            case 'VERIFY' : 
                return 'Verify Email address'
            case 'INFO01' : 
                return 'Account Information'
            case 'INFO02' : 
                return 'Contact Information'
            
        }
    }

    const contentSteper = ()=> {
        switch(step) {
            case 'VERIFY' : return <EmailStep />
            case 'INFO01' : return <AccountStep />
            case 'INFO02' : return <ContactStep />
        }
    }

    React.useEffect(()=> {
        // TODO
        // Need to process for Checking User Login Session
        // Prevent access this page directly when user has session
        initStore()
    },[])

    const onPressVerifyAgain = ()=> {
        initStore()
    }

    const slideVariants = {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "-100%", opacity: 0 }
    }

    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <div className="grid grid-cols-12 gap-10 items-center">
                {/* Left Part : Message */}
                <div className="flex flex-col col-span-6">
                    <p className="text-6xl font-light">Wellcome to </p>
                    <div className="flex flex-row gap-2">
                        <span className='text-6xl font-extrabold text-yellow-400'>Next</span>
                        <span className='text-6xl font-extrabold'>Shopping!</span>
                    </div>
                </div>
                {/* Right Part : Sign up Form */}
                <div className="col-span-6 overflow-hidden">
                    <motion.div
                        layout 
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className='w-full'>  
                        <Card 
                            variant="secondary"
                            className='relative overflow-hidden'>
                            <motion.div  layout className='flex flex-col'>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.div
                                        key={step}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ 
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 }
                                        }}
                                        className="w-full">
                                        <Card.Header className="text-lg font-bold">
                                            {headerSteper()}
                                        </Card.Header>
                                        <Card.Content>
                                            {contentSteper()}
                                        </Card.Content>
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                            <Card.Footer className="flex flex-col gap-4 p-6 border-t-2 border-black">
                                <div className="flex w-full items-center justify-center">
                                    { /* Step Dot */}
                                    <div className="flex gap-3">
                                        { ['VERIFY','INFO01', 'INFO02'].map((number)=> (
                                            <div
                                                key={number}
                                                className={`
                                                    h-3 w-3 rounded-full boder-none transition-all duration-500
                                                    ${step === number
                                                        ? " bg-yellow-400"
                                                        : "bg-black"
                                                    }   
                                                `}
                                            />

                                        ))}
                                    </div>
                                </div>
                            </Card.Footer>
                        </Card>
                    </motion.div>
                </div>

            </div>

        </div>
    )
}