export default function FriendManage() {

    return (
        <div className='default-box 
            flex flex-col w-[55rem] h-full ml-1 p-5 gap-2'>
            <p className="font-bold text-start text-4xl">
                Friend Manage
            </p>
            <div className="grid grid-flow-col gap-2">
                <div className="default-box-inner h-[100vh] grid-cols-4">
                    <p className="text-xl font-bold text-start">
                        Send Request
                    </p>
                    <ul className="text-sm list-inside list-disc text-start text-balance">
                        <li>
                            A list of friend requests that are waiting to be accepted.
                        </li>
                        <li>
                            You can wait for them to accept or cancel it.
                        </li>

                    </ul>
                </div>
                <div className="default-box-inner grid-cols-4">
                    <p className="text-xl font-bold text-start">
                        Receive Request
                    </p>
                    
                </div>
                <div className="default-box-inner grid-cols-4">
                    <p className="text-xl font-bold text-start">
                        Delete Friend
                    </p>
                </div>
            </div>

        </div>
    )
}