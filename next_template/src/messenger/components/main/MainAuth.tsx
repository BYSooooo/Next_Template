import React from 'react';

export default function MainAuth() {


    return (
        <div className="box-content border-solid border-2 border-blue-950 dark:border-blue-300 rounded-xl w-96 h-96 p-2.5">
            <div className="flex p-3 items-start justify-between">
                <h1 className="text-3xl text-center font-bold">
                    Sign In
                </h1>
            </div>
            <div className='flex pl-3'>
                <h6>
                    Please Select Service
                </h6>
            </div>
            <div className="grid p-3 h-52 mt-10 grid-rows-3 py-6 gap-2">
                    <div className="flex justify-center items-center min-w-full">
                        <button
                            className=" w-2/3 rounded-full border-solid border-blue-500 border-2  p-2 hover:bg-blue-500"
                        >
                            Sign in with Google
                        </button>

                    </div>
                    <div className="flex justify-center items-center min-w-full">
                        <button
                            className="w-2/3 rounded-full border-solid border-gray-800 border-2 p-2 hover:bg-gray-800 hover:text-white" >
                            Sign in with GitHub
                        </button>
                    </div>
                    <div className="flex justify-center items-center min-w-full">
                        <button
                            className="w-2/3 rounded-full border-solid  border-gray-400 border-2 p-2 hover:bg-gray-400">
                            Sign in with Email
                        </button>
                    </div>
                </div>
        </div>
    )
}