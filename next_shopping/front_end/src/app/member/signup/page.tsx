import { Card, Separator } from "@heroui/react";

export default function Page() {
    return (
        <div className="inner-container flex items-center h-screen justify-center flex-row">
            <div className="grid grid-cols-12">

            </div>
            <div className="flex flex-col grid-cols-5">
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
            <Separator orientation="vertical" className="grid-cols-2"/>
            <Card className="grid-cols-5">
                <Card.Header>
                    Information
                </Card.Header>
                <Card.Content>
                    
                </Card.Content>
            </Card>

        </div>
    )
}