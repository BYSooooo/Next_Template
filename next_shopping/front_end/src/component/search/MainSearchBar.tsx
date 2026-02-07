import SearchButton from "./item/SearchButton";
import SearchField from "./item/SearchField";

export default function MainSearchBar() {
    return (
        <section className="w-full bg-yellow-400">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="grid grid-cols-5 items-center gap-2">
                    <div className="flex justify-center col-span-1 bg-gray-600 rounded-xl min-h-full text-center items-center">
                        <p className="text-white">
                            This is Logo
                        </p>
                    </div>
                    <SearchField />
                    <div className="flex col-span-1 justify-center">
                        <SearchButton />
                    </div>
                </div>
            </div>
        </section> 
    )
}