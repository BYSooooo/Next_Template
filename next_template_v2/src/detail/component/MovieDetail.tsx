import { Box, List, Paper, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";
import { Info, Search, Star } from "@mui/icons-material";

export default function MovieDetail() {
    
    return (
        <Box>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Description
            </Typography>
            <Paper sx={{ px : 2, mb : 2, rowGap : 1 }}>
                <List>
                    <DetailListItem icon={<Search />} text="Search movie by keyword"/>
                    <DetailListItem icon={<Star />} text="Display movie rank" />
                    <DetailListItem icon={<Info />} text="Display summary and detail of movies" />
                </List>
            </Paper>
            <Typography variant="subtitle2" fontWeight="bold">
                Architecture
            </Typography>
            <Paper sx={{ px : 2, mb : 2, rowGap : 1 }}>
                ...
            </Paper>
            <Typography variant="subtitle2" fontWeight={'bold'}>
                Preview
            </Typography>
        </Box>
    )
}