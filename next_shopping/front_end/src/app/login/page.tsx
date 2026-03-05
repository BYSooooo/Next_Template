"use client"

import GoogleLogin from "@/component/login/GoogleLogin";
import { Button, Card, Input, Label, Separator, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Page() {
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ validYn, setValidYn ] = useState(false);

    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <p className="font-bold text-xl">
                Login
            </p>
            <div className="flex flex-row gap-2 w-fit">
                <Card className="bg-gray-50 w-65">
                    <Card.Title className="font-bold shadow-accent-soft">
                        Select Service
                    </Card.Title>
                    <Card.Content>
                        <GoogleLogin />
                    </Card.Content>
                </Card>
                <Separator orientation="vertical"/>
                <Card className="bg-gray-50 w-65">
                    <Card.Title className="font-bold shadow-accent-soft">
                        Input Email/Password
                    </Card.Title>
                    <Card.Content>
                        <TextField>
                            <Label>Email</Label>
                            <Input
                                fullWidth
                                onChange={(e)=> setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Input Email..."
                                className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                            />
                            <Label>Password</Label>
                            <Input
                                fullWidth
                                onChange={(e)=> setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Input Password..."
                                className="border-2 border-solid border-black focus:outlin-0 focus:ring-0"
                            />
                        </TextField>
                    </Card.Content>
                    <Card.Footer className="flex flex-col gap-2">
                        <Button className="w-full">
                            Login
                        </Button>
                        <Button 
                            onPress={()=>router.push("/login/signin")}
                            className="w-full" variant="secondary">
                            Sign In
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    )
}