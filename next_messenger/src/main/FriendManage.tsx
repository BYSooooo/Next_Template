export default function FriendManage() {

    return (
        <div className='default-box 
            flex flex-col w-[55rem] h-full ml-1 p-5 gap-2'>
            <p className="font-bold text-start text-4xl">
                Friend Manage
            </p>
            <div className="grid grid-flow-col gap-2">
                <div className="default-box-inner h-[100vh]">
                    <p className="text-xl font-bold text-start">
                        Send Request
                    </p>
                    <ul className="text-sm list-inside list-disc text-start">
                        <li>
                            
                        </li>
                    </ul>
                </div>
                <div className="default-box-inner">
                    <p className="text-xl font-bold text-start">
                        Receive Request
                    </p>
                    
                </div>
                <div className="default-box-inner">
                    <p className="text-xl font-bold text-start">
                        Delete Friend
                    </p>
                </div>
            </div>

        </div>
    )
}