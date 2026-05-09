"use client"

import React from "react";


import { Button, Card, Description, Text } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/zustand/useModalStore";
import LoginModal from "@/component/common/modal/LoginModal";

export default function Page() {

    const { openModal } = useModalStore();
    const router = useRouter()

    return (
        <div className="inner-container flex items-center h-screen justify-center flex-col gap-2">
            <span className='text-4xl font-extrabold'>Success!</span>
            <Card 
                variant="secondary"
                className='relative overflow-hidden'>
                <Card.Header className="text-lg font-bold">
                    Sign Up Success
                </Card.Header>
                <Card.Content>
                    <Text className="text-sm">Welcome to join Next Shopping!</Text>
                    <Text className="text-sm">The sign up has been completed successfully.</Text>
                    <Button 
                        className='w-full bg-yellow-500 text-black mt-2'
                        onPress={()=>openModal(<LoginModal/>, "lg")}>
                        Sign In
                    </Button>
                    <Button 
                        className='w-full bg-yellow-500 text-black mt-2'
                        onPress={()=> router.push("/")}>
                        Go to Main
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}