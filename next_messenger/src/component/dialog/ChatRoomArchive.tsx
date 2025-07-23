"use client";

import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import ChatItem from '../../chat/ChatItem';
import { getSelectedUserInfo } from '../../controller/FirebaseController';

export default function ChatRoomArchive() {
    const chatStore = useAppSelector((state)=> state.chatStore);
    React.useEffect(()=> {
        
    },[])

    /*
    const onClickExportText = (e : React.MouseEvent)=> {
        e.preventDefault();
        if(chatStore.messages.length > 0) {
            const array = []
            
            for (const item of chatStore.messages) {
                
                const response = await getSelectedUserInfo({uuid : item.createdBy, chatId : chatStore})
                const context = {
                    time : item.createdAt.toLocaleString(),
                    sender : 

                }
            }
            chatStore.forEach((chatItem)=> {

                if(chatItem.content.length > 0) {
                    const context = {
                        time : chatItem.createdAt.toLocaleString(),
                        sender : chatItem.createdBy,
                        message : chatItem.content,
                    }
                    array.push(context);
                }
            })
            messageDown(JSON.stringify(array, null, "\t"), `export_msg_${new Date().toLocaleDateString()}.txt`, 'text/txt');
        }

    }
    */

    const messageDown = (data: BlobPart, fileName : string, fileType : string) => {
        const blob = new Blob([data], { type : fileType});
        const a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvent = new MouseEvent('click', {
            view : window,
            bubbles : true,
            cancelable : true
        });
        a.dispatchEvent(clickEvent);
        a.remove()
    }

    const onClickExportCSV = ()=> {

    }

    return (
        <div className='flex flex-col '>
            <h1 className='font-bold text-sm mb-1'>
                Messages Export
            </h1>
            <ul>
                <li className='text-xs'>
                    You can export Messages.
                </li>
                <li>
                    Attachments Files are not export.
                </li>
            </ul>
            <button 
                className='default-button'
                //onClick={onClickExportText}
                >
                Export TXT
            </button>
            <button 
                className='default-button'
                onClick={onClickExportCSV}>
                Export CSV
            </button>
        </div>
    )
}