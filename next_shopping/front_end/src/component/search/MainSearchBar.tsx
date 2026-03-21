import SearchButton from "./item/SearchButton";
import SearchField from "./item/SearchField";

export default function MainSearchBar() {
    return (
        <section className="w-full bg-yellow-400">
            <div className="inner-container flex justify-center py-6 md:py-8">
                <div className="flex items-center gap-3 md:gap-4 w-full">
                    <div className="flex-none w-24 md:w-32 flex justify-center bg-zinc-900 text-white rounded-2xl py-3 px-4 shadow-md">
                        <span className="font-bold tracking-tighter w-full max-w-250">
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