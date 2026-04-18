import { Input, Label, TextField } from "@heroui/react";

export default function NicknameField() {

    return (
        <TextField>
            <Label isRequired>Nickname</Label>
            <Input className="form-input"/>
        </TextField>
    )
}