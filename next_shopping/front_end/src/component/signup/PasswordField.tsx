import { Input, Label, TextField } from "@heroui/react";

export default function PasswordField() {
    

    return (
        <div>
            <TextField>
                <Label isRequired>Password</Label>
                <Input className="form-input"/>
            </TextField>
            <TextField>
                <Label isRequired>Password Confirm</Label>
                <Input className="form-input"/>
            </TextField>
        </div>

    )
}