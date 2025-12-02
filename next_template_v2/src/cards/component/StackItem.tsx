import { Avatar, Stack, Typography } from "@mui/material";

export default function StackItem({iconPath, name} : { iconPath : string, name : string}) {

    return (
        <Stack direction={'row'} columnGap={1} alignItems={'center'}>
            <Avatar
                src={iconPath}
                sx={{ width : 30, height : 30, boxShadow : 1}}
            />
            <Typography>
                {name}
            </Typography>
        </Stack>
    )
}