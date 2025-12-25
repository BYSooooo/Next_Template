import { Title } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Container, Grid, GridBaseProps, GridSize, Typography } from "@mui/material";
import MessengerCard from "../cards/MessengerCard";
import MovieCard from "../cards/MovieCard";
import ShoppingCard from "../cards/ShoppingCard";



export default function Page() {
    return (
        <Grid container sx={{ p : 2}} spacing={2}>
            <Grid size={{ xs : 12, sm : 6, md : 4}}>
                <MessengerCard />
            </Grid>
            <Grid size={{ xs : 12, sm : 6, md : 4}}>
                <MovieCard />
            </Grid>
            <Grid size={{ xs : 12, sm : 6, md : 4}}>
                <ShoppingCard />
            </Grid>
        </Grid>
    
    )
}