import { useAppSelector } from "../redux/hooks"

export default function FriendManage() {
    const userStore = useAppSelector((state)=> state.userStore)

    const handleSendRequestList = ()=> {
        const sendReqList = userStore.requested;
        if(sendReqList) {
            if(sendReqList.length > 0) {
                sendReqList.map((req)=> {
                    console.log('FriendManage : ', req)
                    return ( 
                        <p>
                            {req}
                        </p>
                    )
                })
            } else {
                return <p>
                    No List
                </p>
            }
        } else {
            return <p>
                No List
            </p>
        }
    }

    const handleRsvRequestList = ()=> {
        const receiveReqList = userStore.received;
        if(receiveReqList) {
            if(receiveReqList.length > 0) {
                receiveReqList.forEach((res)=> {
                    return <p>
                        {res}
                    </p>
                })
            } else {
                return <p>
                    No List
                </p>
            }
        } else {
            return <p>
                No List
            </p>
        }
    }

    return (
        <div className='default-box 
            flex flex-col w-[55rem] h-full ml-1 p-5 gap-2'>
            <p className="font-bold text-start text-4xl">
                Friend Manage
            </p>
            <div className="grid grid-flow-col  grid-cols-3 gap-2">
                <div className="default-box-inner h-[100vh]">
                    <p className="text-xl font-bold text-start">
                        Send Request
                    </p>
                    <div className="h-[15%]">
                        <ul className="text-sm list-inside list-disc text-start text-pretty">
                            <li>
                                A list of friend requests that are waiting to be accepted.
                            </li>
                            <li>
                                You can wait for them to accept or cancel it.
                            </li>
                        </ul>

                    </div>
                    <div className="h-[85%]">
                        {handleSendRequestList()}
                    </div>
                </div>
                <div className="default-box-inner">
                    <p className="text-xl font-bold text-start">
                        Receive Request
                    </p>
                    <div className="h-[15%]">
                        <ul className="text-sm list-inside list-disc text-start text-pretty">
                            <li>
                                This is a list of friend registration requests that you have received.
                            </li>
                            <li>
                                You can accept or decline.
                            </li>
                        </ul>
                    </div>
                    <div className="h-[85%]">
                        {handleRsvRequestList()}
                    </div>
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