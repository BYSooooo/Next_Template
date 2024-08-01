import { Container, Typography } from "@mui/material";
import OverviewList from "../main/OverviewList";
import TopRankView from "../main/TopRankView";


export default function Page() {
    return (
        <Container 
            fixed 
            sx={{ minWidth: 1024, height : '100vh', mt : '1rem', textAlign : 'center'}} >
            <Typography 
                fontWeight='Bold' 
                variant="h2">
                What is your Movie?
            </Typography>
            <TopRankView />
            <OverviewList sort={"popular"}/>
            {/* <OverviewList sort={"topRate"}/>
            <OverviewList sort={"upcomming"} /> */}
        </Container>
    )
}