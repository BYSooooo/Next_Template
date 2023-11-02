import React from 'react';

export default function UserInfoModal({showModal} : {showModal : boolean}) {

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50">
            <h4 className='text-lg'>
                Test Modal

            </h4>
        </div>
    )
}