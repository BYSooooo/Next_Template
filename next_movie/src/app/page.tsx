import { Container, Typography } from "@mui/material";
import TopRankView from "../main/TopRankView";
import OverviewList from "../main/OverviewList";


export default function Page() {
    return (
        <Container 
            fixed 
            sx={{ minWidth: 1024, height : '100vh', mt : '7rem', textAlign : 'center'}} >
            <Typography 
                fontWeight='Bold' 
                variant="h2"
                noWrap>
                What is your Movie?
            </Typography>
            <TopRankView sort={"popular"}/>
            <OverviewList sort={"popular"}/>
            {/* <OverviewList sort={"topRate"}/>
            <OverviewList sort={"upcomming"} /> */}
        </Container>
    )
}