"use client"

import React from 'react';

import { ChatMessage } from "../../typeDef";
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { getChatRoomFile } from '../controller/FirebaseController';
import Link from 'next/link';

export default function ChatItem({currentUid, chatId, chat} : {currentUid: string, chatId : string, chat : ChatMessage}){
    const [senderType, setSenderType] =  React.useState<'me'|'other'|'sys'>('sys');
    const [fileString, setFileString ] = React.useState<string>(null);
    const [loadingYn, setLoadingYn] = React.useState(false);
    React.useEffect(()=> {
        console.log(chat)
        switch(chat.createdBy) {    
            case 'System' : 
                setSenderType('sys')
            break;
            default : 
            return chat.createdBy === currentUid
                ? setSenderType('me')
                : setSenderType('other')
        }
    },[])
    React.useEffect(()=> {
        chat.attachYn && chat.attachFile.length !== 0 && getFileString(chat.attachFile);
    },[])

    const getFileString = async (attachUid : string)=> {
        const { result, value } = await getChatRoomFile(chatId, attachUid);
        result && setFileString(value); 
    }

    // Set justify of message position
    const spanCSS = {
        me : 'self-end text-end',
        other : 'justify-begin',
        sys : 'self-center justify-center mx-20'
     }

    // Set Text CSS Setting for message
    const textCSS = {
        me : "bg-blue-500 dark:bg-blue-600 self-end",
        other : "bg-gray-500 dark:bg-gray-600",
        sys : "bg-purple-500 dark:bg-purple-600"
    }

    const imageCSS = {
        me : "justify-end",
        other : "",
        sys: "justify-start"
    }
    
    return (
        <span className={`flex flex-col mx-2 gap-2 ${spanCSS[senderType]} max-w-[70%]`}>
            { /* Display Attach File(Image)*/
                chat.attachYn === true && fileString &&
                <div className={`flex flex-row ${imageCSS[senderType]}`}>
                    { chat.content.length == 0 &&
                        senderType === 'me'&&
                        <p className='text-[0.6rem] self-end mr-1'>
                            {new Date(chat.createdAt as any).toLocaleTimeString()}
                        </p>
                    }
                    <Link href={fileString} target="_blank" >
                        <img src={fileString}
                            className={`w-20 h-20 rounded-md overflow-auto ${textCSS[senderType]} p-2`}
                        /> 
                    </Link>
                    { senderType === 'other' &&
                        <p className='text-[0.6rem] self-end mr-1'>
                            {new Date(chat.createdAt as any).toLocaleTimeString()}
                        </p>
                    }

                </div>
            }
            { chat &&
                <div className='flex flex-row'>
                    { /* Display Send Time for 'me' */
                        senderType === "me" && 
                        <p className='text-[0.6rem] self-end mr-1'>
                            {new Date(chat.createdAt as any).toLocaleTimeString()}
                        </p>
                    }
                    {/* Check Message Delete (Delete Function provided only File )*/
                        chat.deleteYn === true
                        ? /* If removed */
                            <p className={'flex rounded-lg px-2 py-2 text-pretty bg-gray-900 text-gray-600 italic text-sm'}>
                                This message has been deleted.
                            </p>
                        : /* else if message not removed */
                        <> 
                            { chat.content.length > 0 &&
                                <p className={`flex rounded-lg px-2 py-1 ${textCSS[senderType]} text-pretty`}>
                                    { /* Icon for System Message */ 
                                        chat.createdBy === "System" 
                                            && <InformationCircleIcon className='w-6 h-6'/> 
                                    }
                                    { chat.content}
                                </p>
                            }
                        </>
                    }
                    
                    { /* Display Send Time for 'other */
                        senderType === "other" && 
                        <p className='text-[0.6rem] self-end ml-1'>
                            {new Date(chat.createdAt as any).toLocaleTimeString()}
                        </p>
                    }
                </div>
            }
        </span>
    )
}