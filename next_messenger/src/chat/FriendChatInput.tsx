export function FriendChatInput() {
    return (
        <div className="chat-input-box
            flex flex-row w-[40rem] ml-1 h-[3rem]
            justify-center p-2 gap-2">
            <input className="default-input w-[80%]">
            </input>
            <button className="default-button w-[7%] justify-center">
                File
            </button>
            <button className="default-button w-[7%] justify-center">
                Send
            </button>
        </div>
    )
}