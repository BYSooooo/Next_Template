"use client";

import React from 'react';

import { useModalStore } from "@/zustand/useModalStore";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Card, Input, Label, Modal, Separator, TextField, } from "@heroui/react";
import GoogleLogin from "../login/GoogleLogin";
import { useRouter } from "next/navigation";

export default function LoginModal() {
    const { closeModal } = useModalStore();
    const router = useRouter();

    const [ email, setEmail] = React.useState("");
    const [ password, setPassword] = React.useState("");
        
    
    const onPressSignInEmail = ()=> {
        closeModal();
        router.push('/login')
    }

    const onPressSignIn = ()=> {

    }

    return (
        <Modal.Dialog>
            <Modal.CloseTrigger onPress={()=>closeModal()}/>
                <Modal.Header >
                    <Modal.Heading className="text-lg font-bold">
                        Login
                    </Modal.Heading>
                </Modal.Header>
                <Modal.Body className="flex flex-row gap-3">
                    <div className='flex flex-col gap-3'>
                        <TextField>
                            <Label>Email</Label>
                            <Input
                                fullWidth
                                onChange={(e)=> setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Input Email..."
                                className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                            />
                            <Label>Password</Label>
                            <Input
                                fullWidth
                                onChange={(e)=> setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Input Password..."
                                className="border-2 border-solid border-black focus:outlin-0 focus:ring-0"
                            />
                        </TextField>
                        <Button
                            onPress={onPressSignIn}
                            className="w-full flex flex-row">
                            <EnvelopeIcon />
                            Sign in with Email
                        </Button>
                    </div>
                    <Separator orientation="vertical"/>
                    <div className='flex flex-col'>
                        <p>
                            Select for Sign In
                        </p>
                        <GoogleLogin />

                    </div>
                </Modal.Body>
            
        </Modal.Dialog>       
    )
}