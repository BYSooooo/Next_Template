import { Box, List, Paper, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";
import { Info, Search, Star } from "@mui/icons-material";
import Carousel from "./Crousel";

/* Static Image */
import image01 from '../../../public/asset/movie01.png';
import image02 from '../../../public/asset/movie02.png';
import image03 from '../../../public/asset/movie03.png';
import image04 from '../../../public/asset/movie04.png';


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
            <Typography variant="subtitle2" fontWeight={'bold'}>
                Preview
            </Typography>
            <Paper sx={{ p : 1, rowGap : 1}}>
                <Carousel data={[image01,image02, image03, image04]} />
            </Paper>
            {/* <Typography variant="subtitle2" fontWeight="bold">
                Architecture
            </Typography>
            <Paper sx={{ px : 2, mb : 2, rowGap : 1 }}>
                
            </Paper> */}
        </Box>
    )
}