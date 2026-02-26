import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@heroui/react";

export default function ManualLogin() {
    const onPressSignIn = ()=> {

    }

    return (
        <>
            <Input
                fullWidth
                placeholder="Input Email..." 
                className='border-2 border-solid border-black focus:border-none'
                />
            <Button
                onPress={onPressSignIn}
                className="w-full flex flex-row">
                <EnvelopeIcon />
                Sign in with Email
            </Button>
        </>
    )
}