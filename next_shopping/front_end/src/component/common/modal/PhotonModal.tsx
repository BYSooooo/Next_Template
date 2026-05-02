"use strict";

import React from 'react';

import { useModalStore } from '@/zustand/useModalStore';
import { Avatar, Button, Description, Input, Label, ListBox, Modal, ScrollShadow, TextField } from '@heroui/react';
import { useToastStore } from '@/zustand/useToastStore';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { useSignUpStore } from '@/zustand/useSignUpStore';

export default function PhotonModal() {
    const { closeModal } = useModalStore()
    const { openToast } = useToastStore()
    const { setInfo } = useSignUpStore()

    const [inputAddr, setInputAddr] = React.useState("");
    const [resultList, setResultList] = React.useState([]);

    const onPressSearchAddr = async() => {
        if(inputAddr.length < 3) return;
        try {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(inputAddr)}&limit=20`)
            const result = await res.json();
            
            setResultList(result.features)
        } catch(error) {
            openToast({
                title : 'Error : Address Search',
                variant: 'warning',
                description : error.toString()
            })
        } 
    }

    const onClickListItem = (item)=> {
        const result = item.properties;

        const countryCode = result.countrycode;
        const postCode = result.postcode;
        const address1 = result.name;

        setInfo({
            countryCode : countryCode,
            postCode : postCode,
            address1 : address1
        })
        console.log(countryCode, postCode, address1)

        closeModal()
    }

    return (
        <Modal.Dialog>
            <Modal.CloseTrigger onPress={()=> closeModal()}/>
                <Modal.Header className='text-lg font-bold'>
                    Search Address
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-3">
                    <div className='flex-none'>
                        <TextField
                            onKeyDown={(e)=> {
                              if(e.key === 'Enter') {
                                onPressSearchAddr()
                              }  
                            }}
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
                            <Description className='text-xs text-gray-600'>
                                - Up to 20 Addresses are displayed.
                            </Description>
                            <Description>
                                - If you cannot find address, Please enter more detailed Address.
                            </Description>
                        </TextField>
                    </div>
                    <ScrollShadow>
                        <ListBox 
                            selectionMode='single' >
                            { resultList.map((item)=> {
                                const itemKey = item.properties.osm_id;
                                return (
                                    <ListBox.Item
                                        onClick={()=>onClickListItem(item)} 
                                        key={itemKey}>
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
                                    )

                            })}
                        </ListBox>
                    </ScrollShadow>
                </Modal.Body>
        </Modal.Dialog>
    )

}