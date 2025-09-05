"use client";

import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { getSelectedUserInfo } from '../../firebase/UserInfo';

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

    const onClickExportCSV = async(e : React.MouseEvent)=> {
        e.preventDefault();
        const headers = ['Time','Sender','Message'];
        const csvRows :string[] = [];

        csvRows.push([...headers].join(','))

        for(const message of chatStore.messages) {
            const { createdAt, createdBy, content } = message;
            const { result, value } = await getSelectedUserInfo({ uuid : createdBy});
            if(result && value) {
                const rowData = [
                    createdAt.toLocaleString(),
                    value.displayName,
                    content ? content : 'Deleted Message'
                ]
                csvRows.push([...rowData].join(','))
            }
        }
        messageDown(csvRows.join('\n'), `export_msg_${new Date().toLocaleDateString()}.csv`, 'text/csv')
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-sm mb-1'>
                    Messages Export
                </h1>
                <ul className='list-disc px-2'>
                    <li className='text-xs'>
                        You can export Messages.
                    </li>
                    <li className='text-xs'>
                        Attachments Files are not export.
                    </li>
                </ul>
                <button 
                    className='default-button px-2 py-1'
                    onClick={onClickExportText}>
                    Export .txt
                </button>
                <button 
                    className='default-button px-2 py-1'
                    onClick={onClickExportCSV}>
                    Export .csv
                </button>
            </div>
            <div className='flex flex-row-reverse'>
                <button>
                    Close
                </button>
            </div>
        </div>
    )
}