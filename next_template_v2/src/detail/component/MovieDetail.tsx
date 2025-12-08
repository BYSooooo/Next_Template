import { Box, List, Paper, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";

export default function MovieDetail() {
    
    return (
        <Box>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Description
            </Typography>
            <Paper sx={{ px : 2, mb : 2, rowGap : 1 }}>
                <List>
                    
                </List>
            </Paper>
        </Box>
    )
}