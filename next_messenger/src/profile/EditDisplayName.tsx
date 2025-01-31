export default function EditDisplayName() {
    return (
        <div className="flex flex-col bg-slate-300 dark:bg-slate-700 rounded-lg p-3">
            <div className="flex flex-col text-start ">
                <p className="text-2xl font-bold">
                    Display Name
                </p>
                <ul className="text-sm list-inside list-disc">
                    <li> Set a Name for using on the site. </li>
                    <li> This entry cannot be blank. </li>
                </ul>
            </div>
            <div className="flex h-full items-center justify-center">
                <input className="default-input">
                </input>
            </div>
            <div className="flex flex-row-reverse gap-2">
                <button className="confirm-button py-1 px-2">
                    Submit
                </button>
            </div>
        </div>
    )
}