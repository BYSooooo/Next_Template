"use client";

import { useModalStore } from '@/zustand/useModalStore';
import { Button, Input, Label, TextField } from '@heroui/react';
import React from 'react';
import PhotonModal from '../common/modal/PhotonModal';
import { useSignUpStore } from '@/zustand/useSignUpStore';
import { useAlertStore } from '@/zustand/useAlertStore';
import { useRouter } from 'next/navigation';
import { useToastStore } from '@/zustand/useToastStore';

export default function ContactStep() {
    const { openModal } = useModalStore()
    const { openToast } = useToastStore();
    const { address1, setInfo } = useSignUpStore();
    const allStat = useSignUpStore()

    const router = useRouter();

    const [inputTel, setInputTel] = React.useState("");

    // Address1 Handled by Zustand
    const [inputAddress2, setInputAddress2] = React.useState("");

    const onPressSignUp = async() => {
        setInfo({
            phone : inputTel,
            // address1, postCost, countryCode is controll with zustand directly
            address2 : inputAddress2
        })

        const state = useSignUpStore.getState();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
                method : 'POST',
                headers : { 
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(state)
            })

            const result = await res.json();
            if(res.ok) {
                // TOBE...
                state.initStore()
                // router.push("/");
            
            } else {
                openToast({
                    title : result.error,
                    description : result.message,
                    variant : 'danger'
                })
                console.log(result)
            }

        } catch (error) {
            openToast({
                title : error.error,
                description : error.message,
                variant : 'danger'
            })
            console.log(error)
        }

    }

    const onPressSearchAddress = () => {
        // Init Previous Info
        setInfo({ postCode : "", countryCode : "", address1 : "" })
        setInputAddress2("");
        openModal(<PhotonModal />, "sm")
    }

    return (
        <div className='flex flex-col gap-2'>
            { /* Phone Part */ }
            <TextField
                type='tel'
                onChange={(e)=> {
                    setInputTel(e)
                }}>
                <Label>Phone</Label>
                <Input
                    className="form-input" 
                    value={inputTel}/>
            </TextField>
            
            {/* Address 1 Part*/}
            <TextField
                isReadOnly>
                <Label>Address 1</Label>
                <div className='flex flex-row gap-2'>
                    <Input
                        value={address1} 
                        className="w-[75%] form-input"/>
                    <Button
                        onPress={onPressSearchAddress} 
                        className="w-[25%] bg-yellow-500 text-black">
                        Search
                    </Button>
                </div>  
            </TextField>
            
            {/* Address 2 Part */}
            <TextField
                onChange={(e)=> setInputAddress2(e)}>
                <Label>Address 2(Optional)</Label>
                <Input
                    value={inputAddress2} 
                    className="form-input" />
            </TextField>
            <Button 
                className="w-full bg-yellow-500 text-black"
                onPress={onPressSignUp}>
                Sign Up
            </Button>
        </div>
    )
}