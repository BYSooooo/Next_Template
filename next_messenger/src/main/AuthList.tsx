export default function AuthList() {

    return (
        <div className="rounded-2xl border-2 w-96 mt-10 p-8
          dark:border-gray-300 
          border-gray-700">
            <button className="rounded-full py-2 px-10 m-2
                hover:cursor-pointer
                border-2
                border-blue-500
                hover:bg-blue-500
                dark:hover:bg-blue-500
                transition">
                Sign in using Google
            </button>
            <button className="rounded-full py-2 px-10 m-2
                hover:cursor-pointer
                border-2
                border-slate-500
                hover:bg-slate-500
                dark:hover:bg-slate-500
                transition">
                Sign in using GitHub
            </button>
        </div>
    )
}