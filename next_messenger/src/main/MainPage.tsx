import { ListBulletIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function MainPage() {
    return (
        <div className='default-box
            flex flex-col max-w-[60vw] ml-1 w-[100vw]' >
            <div className="flex flex-row p-4 justify-between">
                <span className="flex flex-row items-center">
                    <UserCircleIcon className="w-16 h-16"/>
                    <div className="flex flex-col text-start">
                        <p className="font-bold text-xl">
                            User Name
                        </p>
                        <p className="text-sm">
                            SampleEmail@example.com
                        </p>
                    </div>
                </span>
                <span>
                    <ListBulletIcon className="w-7 h-7" />
                </span>
                
            </div>
            <div className="h-0.5 bg-slate-800 dark:bg-white mx-2 rounded-md"/>
            <p>
                This is Main Page
            </p>
        </div>
    )
}
