import { Box, Button, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";


export default function MessengerDetail() {

    return (
        <Box sx={{ maxWidth : '30vw'}}>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Description
            </Typography>
            <Paper sx={{ p : 2}}>
                <Typography>
                    Search for users and add them to your friends list through a request and acceptance process.
                </Typography>
                <Divider />
                <Typography>

                </Typography>
            </Paper>
            <Button >
                Hello
            </Button>
        </Box>
        
        
    )
}