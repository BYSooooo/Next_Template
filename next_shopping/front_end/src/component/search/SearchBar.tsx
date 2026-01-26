import SearchField from "./item/SearchField";

export default function SearchBar() {
    return (
        <div className="flex w-full bg-yellow-300 justify-between">
            <p>
                Logo
            </p>
            <SearchField />
        </div>
    )
}