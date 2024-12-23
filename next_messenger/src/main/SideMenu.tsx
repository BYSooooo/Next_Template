import { DocumentIcon } from "@heroicons/react/24/outline";

export default function SideMenu() {

    return (
        <div className="flex flex-col min-w-10 relative max-w-[10vw] items-center dark:bg-slate-800 bg-slate-200 rounded-md overflow-hidden mr-1 py-2">
            <DocumentIcon className="w-7 h-7" />
        </div>
    )
}