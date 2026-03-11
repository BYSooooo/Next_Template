"use client";

import React from 'react';
import { Card, Form, Input, Label, Separator, TextField } from "@heroui/react";

export default function Page() {

    const [email, setEmail] = React.useState("");


    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <div className="grid grid-cols-12 gap-10">
                <div className="flex flex-col col-span-6">
                    <p className="text-5xl">
                        Wellcome to 
                    </p>
                    <div className="flex flex-row">
                        <p className="text-5xl font-extrabold text-yellow-400">
                            Next
                        </p>
                        <p className="text-5xl font-extrabold">
                            Shopping!
                        </p>
                    </div>
                </div>
                <div className="col-span-6">
                    <Card>
                        <Card.Header className="text-lg font-bold">
                            Information
                        </Card.Header>
                        <Card.Content>
                            <TextField>
                                <Label>Email</Label>
                                <Input
                                    fullWidth
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    placeholder='Input Email...'
                                    className="border-2 border-solid border-black focus:outline-0 focus:ring-0"
                                />
                            </TextField>
                        </Card.Content>
                    </Card>

                </div>

            </div>

        </div>
    )
}