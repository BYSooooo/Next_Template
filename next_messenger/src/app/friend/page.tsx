import ReceiveRequestList from "../../friend/ReceiveRequestList"
import SendRequestList from "../../friend/SendRequestList"

export default function Page() {
    
    return (
        <div className='default-box 
            flex flex-col w-[55rem] h-full ml-1 p-5 gap-2'>
            <p className="font-bold text-start text-4xl">
                Friend Manage
            </p>
            <div className="grid grid-flow-col  grid-cols-3 gap-2">
                <SendRequestList  />
                <ReceiveRequestList />
                <div className="default-box-inner">
                    <p className="text-xl font-bold text-start">
                        Delete Friend
                    </p>
                </div>
            </div>

        </div>
    )
}