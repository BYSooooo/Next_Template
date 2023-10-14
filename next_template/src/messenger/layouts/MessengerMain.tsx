import { HTMLAttributes } from "react"


export default function MessengerMain() {

    return (
        <div className="container m-20 mx-aut h-auto">
            <div>
                <div className="box-content bg-ghostwhite shadow-md rounded-xl w-96 h-96 items-center justify-center p-2.5">
                    <h1 className="text-3xl text-center font-bold">
                        Welcome Messenger
                    </h1>
                    <label className="block">
                        <span>Email</span>
                        <input
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 focus:ring-blue-300 sm:text-sm sm:leading-6"
                            placeholder="input Email"
                        />
                    </label>
                    <label className="block">
                        <span>
                            Password
                        </span>
                        <input 
                            type="password"
                            className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-400"
                            placeholder="input password" />
                    </label>
                    
                </div>

            </div>
        </div>
    )
    
}