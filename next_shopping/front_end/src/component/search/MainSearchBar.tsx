import SearchButton from "./item/SearchButton";
import SearchField from "./item/SearchField";

export default function MainSearchBar() {
    return (
        <section className="w-full bg-yellow-400 border-b-2 border-black/10">
            <div className="inner-container flex justify-center py-6 px-4 md:py-8">
                <div className="flex items-center gap-2.5 md:gap-3 w-full max-w-4xl">
                    {/* Logo Area */}
                    <div className="flex-none h-14 w-24 md:w-32 flex items-center justify-center bg-black text-white rounded-2xl shadow-sm hover:scale-105 transition-transform cursor-pointer">
                        <span className="font-extrabold tracking-tighter text-lg md:text-xl">
                            LOGO
                        </span>
                    </div>

                    <div className="grow min-w-0">
                        <SearchField />
                    </div>

                    <div className="flex-none">
                        <SearchButton />
                    </div>

                </div>

            </div>
        </section> 
    )
}