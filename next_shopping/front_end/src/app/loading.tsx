import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center flex-col gap-4">
            <Spinner size="xl">
                <span className="text-xs text-muted">
                    Now Loading
                </span>
            </Spinner>

        </div>
    )
}