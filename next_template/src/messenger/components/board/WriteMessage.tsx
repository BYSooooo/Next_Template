import React from 'react'

export function WriteMessage() {

    return (
        <div className='flex gap-1'>
            <input className='rounded-md border-2 border-slate-500' />
            <button className='px-2 rounded-md border-none bg-blue-400 text-white hover:bg-blue-600 transition duration-200'>
                Send
            </button>
        </div>
    )
}