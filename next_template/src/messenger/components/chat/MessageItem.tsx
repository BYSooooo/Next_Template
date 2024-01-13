import React from 'react';
import { MessageInfo, UserInfo } from '../../../../msg_typeDef';

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
            <h4 className='pl-1 text-left text-xs text-slate-500'>
                {authorInfo.displayName}
            </h4>    
    }
    const showCreateDate = ()=> {
        const transDate = message.createDate.toDate().toLocaleTimeString().split(':');
        const dateString = `${transDate[2].slice(-2)} ${transDate[0]}:${transDate[1]}`
        return authorInfo &&
        <h5 className='text-xs font-extralight'>
            {dateString}
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
                        <h4 className='w-fit rounded-lg border-none bg-slate-300 dark:bg-slate-700 px-2 py-1'>                
                                {message.message}
                        </h4>
                        {authorYn === false && showCreateDate()}

                    </div>
                </div>
            </div>
        </div>
    )
}