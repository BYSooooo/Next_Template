import React from 'react';
import { MessageInfo, UserInfo } from '../../../../msg_typeDef';
import Link from 'next/link';

export function MessageItem({message, authorYn, authorInfo, dateChange} : {message : MessageInfo, authorYn : boolean, authorInfo : UserInfo, dateChange : boolean}) {
    const checkAuthor = ()=> {
        let defaultCSS = 'flex w-full h-fit px-2 text-sm'
        switch(authorYn) {
            case true:
                defaultCSS += ' justify-end';
                break;
            case false:
                defaultCSS += ' justify-start'
                break;
            default : break;
        }
        return defaultCSS
    }
    const showDisplayName = () => {
        return authorYn !==true &&
            <h1 className='pl-1 text-left text-xs text-slate-500'>
                {authorInfo.displayName}
            </h1>    
    }
    const showCreateDate = ()=> {
        const transDate = message.createDate.toDate()
        const hourString = transDate.getHours() > 12 ? `PM ${transDate.getHours()-12}` : `AM ${transDate.getHours()}`
        return authorInfo &&
        <h5 className='text-xs'>
            {`${hourString}:${transDate.getMinutes()}`}
        </h5>
    }

    return (
        <div className='my-2'>
            {dateChange && 
                <div className='flex rounded-lg bg-zinc-500 justify-center items-center my-4 '>
                    <h6 className='text-sm text-white'>
                        {message.createDate.toDate().toLocaleDateString()}
                    </h6>
                </div>
            }
            <div className={checkAuthor()}>
                {(authorYn === false && authorInfo) && <img src={authorInfo.photoURL} className='w-10 h-10 rounded-full mr-2'/>}
                <div>
                    {authorInfo && showDisplayName()}
                        
                    <div className='flex flex-row items-end gap-2'>
                        {authorYn === true && showCreateDate()}
                        <div className='w-fit rounded-lg border-none bg-slate-300 dark:bg-slate-700 px-2 py-1'>
                            {message.attachedYn === true && 
                                <Link href={message.attachedValue} target='_blank'>
                                    <img src={message.attachedValue} 
                                        className='w-32 h-32 rounded-md m-2 hover:cursor-pointer hover:opacity-50'/>
                                </Link>
                            }
                            <h1>                
                                    {message.message}
                            </h1>

                        </div>
                        {authorYn === false && showCreateDate()}

                    </div>
                </div>
            </div>
        </div>
    )
}