"use client";

import { useModalStore } from "@/zustand/useModalStore";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Button, FieldError, Form, Input, Label, Modal, TextField } from "@heroui/react";
import GoogleLogin from "../login/GoogleLogin";

export default function LoginModal() {
    const { closeModal } = useModalStore();

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

    }

    const onValidateEmail = (value:string) => {
        const valiYn = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
        if(!valiYn) {
            return "Invalid email address"
        }
        return null
    }

    const onValidatePassword = (value : string)=> {
        if(value.trim().length === 0) {
            return "Password is empty"
        }
        return null

    }

    return (
        <Modal.Dialog>
            <Modal.CloseTrigger onPress={()=>closeModal()}/>
                <Modal.Header >
                    <Modal.Heading className="text-lg font-bold">
                        Login
                    </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Select for Sign In
                    </p>
                    <GoogleLogin />
                    
                    {/* <Form onSubmit={onSubmitForm} className="flex flex-col p-2 gap-4">
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value)=> onValidateEmail(value)}>
                            <Label>Email</Label>
                            <Input placeholder="example@example.com" />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            validate={(value)=> onValidatePassword(value)}>
                            <Label>Password</Label>
                            <Input/>
                            <FieldError /> 
                        </TextField>
                        <div className="flex gap-2">
                            <Button type="submit">
                                <CheckIcon />
                                Login
                            </Button>
                        </div>
                    </Form> */}
                </Modal.Body>
            
        </Modal.Dialog>       
    )
}