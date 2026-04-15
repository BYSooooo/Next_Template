"use client"

import { Card } from "@heroui/react";
import { useRouter } from 'next/navigation';
import EmailField from '@/component/signup/EmailField';

// For Handling Hydration Problem, off SSR 
import dynamic from "next/dynamic";
import { useSignUpStore } from "@/zustand/useSignUpStore";
const NoSSRVerifyCodeField = dynamic(()=> 
    import('@/component/signup/VerifyCodeField'), { 
        ssr : false
    })

export default function Page() {
    const { step } = useSignUpStore();

    const router = useRouter();

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
                    <Card>
                        <Card.Header className="text-lg font-bold">
                            Verify Email Address
                        </Card.Header>
                        <Card.Content>
                            <EmailField />
                            <NoSSRVerifyCodeField />
                        </Card.Content>
                        <Card.Footer className="flex flex-col gap-4 p-6 bg-gray-50 border-t-2 border-black">
                            <div className="flex w-full items-center justify-center">
                                {/* Step Text*/}
                                <span className="text-sm font-black text-black">
                                    STEP {step === 'VERIFY' ? '1' : '2' } of 2
                                </span>
                            </div>
                        </Card.Footer>
                    </Card>

                </div>

            </div>

        </div>
    )
}