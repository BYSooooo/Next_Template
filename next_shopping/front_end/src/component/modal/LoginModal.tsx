"use client";

import { useModalStore } from "@/zustand/useModalStore";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Button, FieldError, Form, Input, Label, Modal, Separator, TextField } from "@heroui/react";
import GoogleLogin from "../login/GoogleLogin";
import ManualLogin from "../login/ManualLogin";


export default function LoginModal() {
    const { closeModal } = useModalStore();

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
                    <ManualLogin />
                </Modal.Body>
            
        </Modal.Dialog>       
    )
}