import { Card, TextField } from "@heroui/react";

export default function EmailCard() {
    return (
        <Card className='bg-yellow-400 rounded-xl h-full'>
            <Card.Header className='font-bold'>
                Email
            </Card.Header>
            <Card.Content>
                <TextField type="email">

                </TextField>
            </Card.Content>
        </Card>
    )
}