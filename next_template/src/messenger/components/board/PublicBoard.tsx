import React from 'react'
import { WriteMessage } from './WriteMessage'

export function PublicBoard() {

    React.useEffect(()=> {

    },[])

    return (
        <div className='w-fit border-2 border-solid border-gray-500 rounded-md p-2 m-2'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>
                    Public Message
                </h4>
            </div>
            <div>

            </div>
            <WriteMessage />
        </div>
    )
}