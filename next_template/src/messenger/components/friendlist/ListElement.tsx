import React from 'react'
import { getUserInfoInStrg } from '../FirebaseController'

export function ListElement({mailAddress} : {mailAddress : string}) {
    const [photoURL, setPhotoURL] = React.useState("");
    
    React.useEffect(()=> {
        getPhotoURL()
    },[])

    const getPhotoURL = async()=> {
        const {result, value} = await getUserInfoInStrg(mailAddress)
        console.log(result)
        setPhotoURL(value)
    }

    return (
        <div className='flex p-2 items-center gap-2 rounded-md border-gray-500 border-2 m-1'>
            <img className='w-8 h-8 rounded-full' src={photoURL} />
            <h4 className='font-bold'>
                {mailAddress}
            </h4>
        </div>
    )
    
}