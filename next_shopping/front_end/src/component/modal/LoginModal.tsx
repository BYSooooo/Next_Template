"use client";

import { useModalStore } from "@/zustand/useModalStore";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Modal, Separator, } from "@heroui/react";
import GoogleLogin from "../login/GoogleLogin";
import { useRouter } from "next/navigation";

export default function LoginModal() {
    const { closeModal } = useModalStore();
    const router = useRouter();
    
    const onPressSignInEmail = ()=> {
        closeModal();
        router.push('/login')
    }

    return (
        <Modal.Dialog>
            <Modal.CloseTrigger onPress={()=>closeModal()}/>
                <Modal.Header >
                    <Modal.Heading className="text-lg font-bold">
                        Login
                    </Modal.Heading>
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-3">
                    <p>
                        Select for Sign In
                    </p>
                    <GoogleLogin />
                    <Separator />
                    <Button
                        onPress={onPressSignInEmail}
                        className="w-full flex flex-row">
                        <EnvelopeIcon />
                        Sign in with Email
                    </Button>
                </Modal.Body>
            
        </Modal.Dialog>       
    )
}