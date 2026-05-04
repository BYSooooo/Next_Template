"use client";

import { useModalStore } from '@/zustand/useModalStore';
import { Button, Input, Label, TextField } from '@heroui/react';
import React from 'react';
import PhotonModal from '../common/modal/PhotonModal';
import { useSignUpStore } from '@/zustand/useSignUpStore';

export default function ContactStep() {
    const { openModal } = useModalStore()
    const { address1, setInfo } = useSignUpStore();
    const allStat = useSignUpStore()

    const [inputTel, setInputTel] = React.useState("");

    // Address1 Handled by Zustand
    const [address2, setAddress2] = React.useState("");

    const onPressSignUp = () => {
        console.log(allStat)
    }

    const onPressSearchAddress = () => {
        // Init Previous Info
        setInfo({ postCode : "", countryCode : "", address1 : "" })
        setAddress2("");
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
            <TextField>
                <Label>Address 2(Optional)</Label>
                <Input className="form-input" />
            </TextField>
            <Button 
                className="w-full bg-yellow-500 text-black"
                onPress={onPressSignUp}>
                Sign Up
            </Button>
        </div>
    )
}