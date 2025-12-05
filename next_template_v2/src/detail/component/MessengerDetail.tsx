import { Box, Button, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";


export default function MessengerDetail() {

    return (
        <Box>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Description
            </Typography>
            <Paper sx={{ p : 2}}>
                <Typography 
                    sx={{ wordBreak : 'break-word', overflowWrap : 'break-word'}}>
                    Search for users
                </Typography>
            </Paper>
            <Button >
                Hello
            </Button>
        </Box>
        
        
    )
}