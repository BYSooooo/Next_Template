import React from 'react'
import { getUserInfoInStrg } from '../FirebaseController'
import Spinner from '../public/Spinner';

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
    const onClickHandler = ()=> {
        return (
            alert("Hello")
        )
    }

    return (
        <div 
            className='flex p-2 m-1 items-center gap-2 rounded-md border-slate-500 border-2 hover:bg-slate-500 hover:text-white hover:cursor-pointer'
            onClick={onClickHandler}>
            {photoURL.length > 0
                ?   <img className='w-8 h-8 rounded-full border-none shadow-none' src={photoURL} />
                :   <Spinner lightMode='black' darkMode='white' />

            }
            <h4 className='font-bold'>
                {mailAddress}
            </h4>
        </div>
    )
    
}