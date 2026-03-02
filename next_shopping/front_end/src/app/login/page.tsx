"use client"

import { Card, Label, Separator } from "@heroui/react";
import { useState } from "react"

export default function Page() {
    const [ email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col items-center">
            <p className="font-bold text-xl">
                Login
            </p>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <Label>
                        Select Service
                    </Label>
                    <Card>

                    </Card>
                </div>
                <Separator orientation="vertical"/>
                <div className="flex flex-col">
                    <Label>
                        Input Email/Password
                    </Label>
                    <Card>

                    </Card>
                </div>
            </div>
        </div>
    )
}