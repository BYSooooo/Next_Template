"use client"

import { Button } from "@heroui/react";
import { useState } from "react"

export default function Page() {
    const [ email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>
                Login - Test
            </h1>
            <input 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
            <h1>
                Password
            </h1>
            <input 
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
            <Button>
                Login
            </Button>
            
        </div>   
    )
}