"use strict";

import React from 'react';

import { useModalStore } from '@/zustand/useModalStore';
import { Button, Input, Label, ListBox, Modal, TextField } from '@heroui/react';
import { useToastStore } from '@/zustand/useToastStore';

export default function PhotonModal() {
    const { closeModal } = useModalStore()
    const { openToast } = useToastStore()

    const [inputAddr, setInputAddr] = React.useState("");

    const onPressSearchAddr = async() => {
        if(inputAddr.length < 3) return;
        try {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(inputAddr)}&limit=5`)
            const result = await res.json();
            console.log(result)
        } catch(error) {
            console.log(error)
        } 
    }

    return (
        <Modal.Dialog>
            <Modal.CloseTrigger onPress={()=> closeModal()}/>
                <Modal.Header className='text-lg font-bold'>
                    Search Address
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-3">
                    <TextField
                        onChange={(e)=> setInputAddr(e)}>
                        <Label>keyword</Label>
                        <div className='flex flex-row gap-2'>
                            <Input
                                className="form-input w-[75%]"/>
                            <Button
                                onPress={onPressSearchAddr} 
                                className="w-[25%] bg-yellow-500 text-black">
                                Search
                            </Button>
                        </div>
                    </TextField>
                    <ListBox selectionMode='single'>

                    </ListBox>
                </Modal.Body>
        </Modal.Dialog>
    )

}