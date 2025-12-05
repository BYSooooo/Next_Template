import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

export default function DetailListItem({ icon, text} : { icon: any, text: string}) {

    return (
        <ListItem disablePadding>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText>
                {text}
            </ListItemText>
        </ListItem>
    )
}