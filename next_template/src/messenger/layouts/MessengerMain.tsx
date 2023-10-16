'use client'
import React from 'react';
import BasicButton from '@/messenger/components/BasicButton'

export default function MessengerMain() {
    const [theme, setTheme] = React.useState('');

    React.useEffect(()=> {
        window.addEventListener('stroage',()=> {
            setTheme(window.localStorage.getItem('mode'))
        })
    },[])

    return (
        <div className="flex container m-20 mx-aut h-auto justify-center">
            <div className={theme}>
                <div className="box-content bg-stone-100  dark:bg-slate-800 shadow-md rounded-xl w-96 h-96 p-2.5">
                    <h1 className="text-3xl text-center font-bold">
                        Welcome Messenger
                    </h1>
                    <div className='h-1/4'>

                    </div>
                    <label className="block my-3">
                        <span className='font-bold'>
                            Email
                        </span>
                        <input
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 focus:ring-blue-300 sm:text-sm sm:leading-6"
                            placeholder="input Email"
                        />
                    </label>
                    <label className="block my-3">
                        <span className='font-bold'>
                            Password
                        </span>
                        <input 
                            type="password"
                            className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 sm:text-sm sm:leading-6"
                            placeholder="input password" />
                    </label>
                    <div className="flex justify-end">
                        <BasicButton context='Join' onClicked={null}/>
                        <BasicButton context='Login' onClicked={null}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
    
}