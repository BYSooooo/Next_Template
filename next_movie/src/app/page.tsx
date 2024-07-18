import { Container, Typography } from "@mui/material";
import PopularList from "../main/PopularList";

export default function Page() {
    return (
        <Container 
            fixed 
            sx={{ height : '100vh', mt : '1rem', textAlign : 'center'}} >
            <Typography 
                fontWeight='Bold' 
                variant="h2">
                What is your Movie?
            </Typography>
            <PopularList />
        </Container>
    )
}