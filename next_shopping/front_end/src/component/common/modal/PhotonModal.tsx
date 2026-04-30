"use strict";

import React from 'react';

import { useModalStore } from '@/zustand/useModalStore';
import { Avatar, Button, Description, Input, Label, ListBox, Modal, TextField } from '@heroui/react';
import { useToastStore } from '@/zustand/useToastStore';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

export default function PhotonModal() {
    const { closeModal } = useModalStore()
    const { openToast } = useToastStore()

    const [inputAddr, setInputAddr] = React.useState("");
    const [resultList, setResultList] = React.useState([]);

    const onPressSearchAddr = async() => {
        if(inputAddr.length < 3) return;
        try {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(inputAddr)}&limit=20`)
            const result = await res.json();
            console.log(result)
            setResultList(result.features)
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
                    <ListBox 
                        selectionMode='single' >
                        { resultList.map((item)=> {
                            const itemKey = item.properties.osm_id;
                            return (
                                <div>
                                    <ListBox.Item key={itemKey}>
                                        <Avatar size="sm">
                                            <BuildingOffice2Icon className='w-5 h-5'/>
                                        </Avatar>
                                        <div className='flex flex-col'>
                                            <Label>{item.properties.name}</Label>
                                            <Description>
                                                { item.properties.state}
                                            </Description>
                                        </div>
                                    </ListBox.Item>
                                </div>
                                )

                        })}
                    </ListBox>
                </Modal.Body>
        </Modal.Dialog>
    )

}