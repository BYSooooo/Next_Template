import { Button } from "@heroui/react";


export default function HeaderBar() {

    return (
        <nav className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="text-xl font-bond">
                    Logo
                </div>
                <div className="hidden md:flex gap-4">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                </div>
                <div>
                    <Button size="sm" variant="primary">Get Started</Button>
                </div>
            </div>
        </nav>
    )
}