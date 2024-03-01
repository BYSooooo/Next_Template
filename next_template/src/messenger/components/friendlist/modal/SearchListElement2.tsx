import React from 'react';
import { RequestFriend, UserInfo } from '../../../../../msg_typeDef';
import { getReuestAddFriendInDoc } from '../../FirebaseController';
import { firebaseAuth } from '../../../../../firebaseConfig';

export default function SearchListElement2({userInfo} : {userInfo : UserInfo}) {
    const [clicked, setClicked] = React.useState(false)
    
    React.useEffect(()=>{
        
    },[])

    const getStatus = async()=> {
        const currentEmail = firebaseAuth.currentUser.email;
        await getReuestAddFriendInDoc().then((response)=> {
            if(response.result) {
                const filterArray : RequestFriend[] = response.value.filter((item : RequestFriend) => {
                    item.from === currentEmail || item.to === currentEmail
                })
                
            }
        })
    }

    const selectedView = ()=> {

        return (
            <div>

            </div>
        )
    }

    const notSelectedView = () => {

        return (
            <div>

            </div>
        )
    }

    
    return (
        <li onClick={()=>setClicked(true)}>
            {clicked 
            ? selectedView() 
            : notSelectedView()
            }    
        </li>
    )

}