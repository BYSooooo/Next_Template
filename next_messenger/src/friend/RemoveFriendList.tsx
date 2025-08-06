"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserInfo } from '../../typeDef';
import { getSelectedUserInfo } from '../controller/FirebaseController';
import UserListItem from '../component/UserListItem';

export default function RemoveFriendList() {
    const dispatch = useAppDispatch();
    const userStore = useAppSelector((state)=> state.userStore);
    const [friendList, setFriendList] = React.useState<UserInfo[]>([])
    
    React.useEffect(()=> {
        getFriendInfo(userStore.friend);
    },[])

    const getFriendInfo = async(friendInfos)=> {
        const fullFriendInfo = [];
        for(const info of friendInfos) {
            const { result, value } = await getSelectedUserInfo(info);
            result && fullFriendInfo.push(value);
        };
        setFriendList(fullFriendInfo);
    }

    const onClickListItem = async(selUserInfo: UserInfo) => {
        console.log(selUserInfo)
    }

    return (
        <div className='default-box-inner h-[100vh]'>
            <p className='text-xl font-bold text-start'>
                Remove Friend
            </p>    
            <div className='h-[15%]'>
                <ul className='text-sm list-inside list-disc text-start text-pretty'>
                    <li>
                        This is a list of friend You can remove.
                    </li>
                    <li>
                        When you remove a friend, all chats and attachments are deleted.
                    </li>
                </ul>
            </div>
            <div className='px-2'>
                {friendList.length > 0
                    ? 
                        <ul role="list" className='flex flex-col gap-2'>
                            {friendList.map((userInfo)=> {
                                return <UserListItem key={userInfo.uid} user={userInfo} selected= {onClickListItem} />
                            })}
                        </ul>
                    :
                        <p>
                            No List
                        </p>
                } 
            </div>
        </div>
    )
}