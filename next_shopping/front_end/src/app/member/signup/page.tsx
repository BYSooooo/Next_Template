"use client"

import { Card } from "@heroui/react";
import { useRouter } from 'next/navigation';
import EmailField from '@/component/signup/EmailField';
import VeriftCodeField from '@/component/signup/VerifyCodeField';

export default function Page() {

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
                <div className="col-span-6">
                    <Card>
                        <Card.Header className="text-lg font-bold">
                            Verify Email Address
                        </Card.Header>
                        <Card.Content>
                            <EmailField />
                            <VeriftCodeField />
                        </Card.Content>
                    </Card>

                </div>

            </div>

        </div>
    )
}