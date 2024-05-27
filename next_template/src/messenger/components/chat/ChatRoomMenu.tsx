import React, { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { Bars4Icon } from '@heroicons/react/20/solid'
import { useAppDispatch } from '@/redux/hook'
import { setPageRendering } from '@/redux/features/messengerReducer'

export function ChatRoomMenu () {
    const dispatch = useAppDispatch()

    function classNames(...classes:any[]) {
        return classes.filter(Boolean).join(' ')
    }

    const onClickHandler = (selected:string)=> {
        switch(selected) {
            case "Option" : 
                dispatch(setPageRendering({middle : "ChatRoomOption"}))
                break;
            case "Exit" : 
                dispatch(setPageRendering({middle : "null"}))
                break;
            default : break;
        }
    }

    return (
        <Menu as="div" className='relative inline-block text-left'>
            <div>
                <Menu.Button className="inline-flex w-full justify-center hover:cursor-pointer">
                    <Bars4Icon className='w-5 h-5 text-end'/>
                </Menu.Button>
            </div>
            <Transition as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-slate-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div>
                            <Menu.Item>
                                {({active})=> (
                                    <h4 className={classNames(active ? 'rounded-tl-md rounded-tr-md bg-gray-100 dark:bg-slate-400 text-gray-900 dark:text-white' : 'text-gray-700','block px-4 py-2 text-sm hover:cursor-pointer' )}
                                        onClick={()=>onClickHandler("Option")}>
                                        Option
                                    </h4>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active})=> (
                                    <h4 className={classNames(active ? 'rounded-br-md rounded-bl-md bg-gray-100 dark:bg-slate-400 text-red-700 dark:text-red-700' : 'text-red-500','block px-4 py-2 text-sm hover:cursor-pointer' )}
                                        onClick={()=>onClickHandler('Exit')}>
                                            Exit
                                    </h4>
                                )}
                            </Menu.Item>
                        </div>
                        
                    </Menu.Items>
            </Transition>
        </Menu>
    )
}