import SideNavigation from "../../main/SideNaigation";

export default function Page() {

    return (
        <div className="flex flex-row mx-auto w-max h-svh text-center justify-center pt-14 pb-2">
            <div className='flex max-w-[10vw]'>
                <SideNavigation />
            </div>
            <div className="default-box
                flex flex-col w-[55rem] h-full ml-1 p-5 gap-2">
                <p className="font-bold text-start text-4xl">
                    Profile
                </p>
            </div>
        </div>
    )
}