import { Input, Label, TextField } from "@heroui/react";

export default function PasswordField() {
    

    return (
        <TextField>
            <Label isRequired>Password</Label>
            <Input className="form-input"/>
        </TextField>

    )
}