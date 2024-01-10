import React from 'react';
import { MessageInfo, UserInfo } from '../../../../msg_typeDef';

export function MessageItem({message, authorYn, authorInfo} : {message : MessageInfo, authorYn : boolean, authorInfo : UserInfo}) {
    const checkAuthor = ()=> {
        let defaultCSS = 'flex w-full h-fit px-2 my-3'
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
    
    
    return (
        <div className={checkAuthor()}>
            {(authorYn === false && authorInfo) && <img src={authorInfo.photoURL} className='w-8 h-8 rounded-full'/>}
            <h4 className='w-fit rounded-lg border-none bg-slate-300 dark:bg-slate-700 px-2 py-1'>                
                    {message.message}
            </h4>
        </div>
    )
}