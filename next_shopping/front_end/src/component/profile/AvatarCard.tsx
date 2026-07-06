"use client";

import React from 'react';
import { Avatar, Button, Card } from '@heroui/react';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useToastStore } from '@/zustand/useToastStore';
import { UserIcon } from '@heroicons/react/24/solid';


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
            const formData = new FormData();
            formData.append('avatar', file);
            formData.append('id', user?.id || '');

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/avatar`, {
                method : 'POST',
                body : formData
            });

            const result = await res.json();
            if(res.ok) {
                setUser({
                    ...user,
                    avatarUrl : result.avatarUrl
                })
                openToast({
                    title : "Success",
                    description : 'Profile Avatar Updated',
                    variant : 'success'
                });
            } else {

            };

            

        } catch (error) {
            openToast({
                title : "Error",
                description : error.message || "Error Occured",
                variant : 'danger'
            })
        } finally {
            setIsUploading(false);
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
                <Avatar className='w-36 h-36 border-4 border-black object-cover shadow-sm bg-white'>
                    { user.avatarUrl 
                        ? <Avatar.Image src={user?.avatarUrl || undefined} />
                        : <UserIcon className='p-5'/>   
                    }
                    
                </Avatar>
                <div className='flex flex-col gap-2 w-[2/3] justify-end'>
                    <input 
                        type='file'
                        ref={fileInputRef}
                        onChange={onChangeFile}
                        accept='image/*'
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