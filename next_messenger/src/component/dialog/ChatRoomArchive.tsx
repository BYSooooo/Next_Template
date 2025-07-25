"use client";

import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { getSelectedUserInfo } from '../../controller/FirebaseController';

export default function ChatRoomArchive() {
    const chatStore = useAppSelector((state)=> state.chatStore);
    React.useEffect(()=> {
        
    },[])
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


    const onClickExportText = async(e : React.MouseEvent)=> {
        e.preventDefault();
        if(chatStore.messages.length > 0) {
            const array = []
            
            for (const item of chatStore.messages) {
                const {result, value } = await getSelectedUserInfo({uuid : item.createdBy})
                if(result) {
                    const context = {
                        time : item.createdAt.toLocaleString(),
                        sender : value.displayName,
                        message : item.content.length > 0 
                                    ? item.content 
                                    : "This Message Remove"
                    }
                    array.push(context)
                }
            }
            messageDown(JSON.stringify(array, null, "\t"), `export_msg_${new Date().toLocaleDateString()}.txt`, 'text/txt');
        }

    }

    const onClickExportCSV = (e : React.MouseEvent)=> {
        e.preventDefault();
        const headers = ['Time', 'Sender', 'message'];
        const csvContent = chatStore.messages.reduce(async (acc, msg)=> {
            const { createdAt, createdBy, content } = msg;
            const { result, value } = await getSelectedUserInfo({ uuid : createdBy})
            acc.push([createdAt.toLocaleString(), value.displayName, content ])
            return acc
        },[])
        messageDown([...headers, ...csvContent].join('\n'), `export_msg_${new Date().toLocaleDateString()}.csv`, 'text/csv')
        
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
                onClick={onClickExportText}
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