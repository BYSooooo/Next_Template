"use client"

import { Card, Input, Label, Separator, TextField } from "@heroui/react";
import { useState } from "react"

export default function Page() {
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ validYn, setValidYn ] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <p className="font-bold text-xl">
                Login
            </p>
            <div className="flex flex-row border-2 border-red-500 rounded-md">
                <Card className="bg-gray-50 w-65">
                    <Card.Title className="font-bold shadow-accent-soft">
                        Select Service
                    </Card.Title>
                    <Card.Content>

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
                                placeholder="input Email..."
                                className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                            />
                            
                        </TextField>
                    </Card.Content>
                </Card>
            </div>
        </div>
    )
}