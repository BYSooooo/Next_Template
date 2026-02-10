import CartButton from "./buttons/CartButton";
import InfoButton from "./buttons/InfoButton";

export default function HeaderBar() {

    return (
        <nav className="sticky top-0 left-0 z-40 w-full border-b bg-background/60 backdrop-blur-md">
            <div className="mx-auto flex flex-row max-w-7xl h-fit items-center justify-between px-6 py-1">
                {/* Logo */}
                <div
                    className="text-xl font-extrabold hover:cursor-pointer">
                    Next Shopping
                </div>
                {/* Icon */}
                <div className="flex flex-row h-full gap-2">
                    <CartButton/>
                    <InfoButton />
                </div>
            </div>
        </nav>
    )
}