"use client";

import React from 'react';
import { Avatar, Button, Card } from '@heroui/react';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useToastStore } from '@/zustand/useToastStore';


export default function AvatarCard() {

    const { user, setUser } = useAuthStore();
    const { openToast } = useToastStore();

    const [isUploading, setIsUploading ] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const onChangeFile = async (e : React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0];
        if(!file) return;

        const maxFileSize = 3 * 1024 * 1024;
        if(file.size > maxFileSize) {
            openToast({
                title : "Upload Failed",
                description : 'File Size exceed.',
                variant : 'danger'
            });
            return;
        }

        if(!file.type.startsWith("image/")) {
            openToast({
                title : "Upload Failed",
                description : "Only image files can be uploaded.",
                variant : 'danger'
            });
            return;
        }

        setIsUploading(true)

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.nickname}_${Date.now()}.${fileExt}`;
            const filePath = `profile_subs/${fileName}`;

            const { error : uploadError } = await supa

        } catch (error) {

        }
    }

    const onPressReset = ()=> {
        
    }

    return (
        <Card className='bg-yellow-400 rounded-xl h-full'>
            <Card.Header className='font-bold'>
                Avatar
            </Card.Header>
            <Card.Content className='flex flex-row gap-6 justify-between'>
                <Avatar className='w-36 h-36'/>
                <div className='flex flex-col gap-2 w-[2/3] justify-end'>
                    <input 
                        type='file'
                        ref={fileInputRef}
                        onChange={onChangeFile}
                        accept='image/jpeg,image/png'
                        className='hidden'  
                    />
                    <Button
                        onPress={()=> fileInputRef.current?.click()}
                        className="w-full bg-black hover:bg-gray-800">
                        Change
                    </Button>
                    <Button 
                        onPress={onPressReset}
                        className='w-full bg-white hover:bg-gray-100 text-black'>
                        Reset
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}