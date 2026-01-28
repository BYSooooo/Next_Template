import SearchButton from "./item/SearchButton";
import SearchField from "./item/SearchField";

export default function SearchBar() {
    return (
        <div className="grid grid-cols-5 py-4 w-full bg-yellow-400 items-center">
            <div className="flex justify-center col-span-1">
                <p>
                    Logo
                </p>
            </div>
            <SearchField />
            <div className="flex col-span-1 justify-center">
                <SearchButton />
            </div>
        </div>
    )
}