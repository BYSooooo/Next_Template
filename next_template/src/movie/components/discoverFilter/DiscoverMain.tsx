import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import GenreFilter from "./GenreFIlter";
import RateFilter from "./RateFilter";
import ReleaseDateFilter from "./ReleaseDateFilter";



export default function DiscoverMain() {

    return (
        <Box sx={{ width : "100%"}} >
            <Grid container direction='row'>
                <GenreFilter />
                <ReleaseDateFilter />
                <RateFilter />
            </Grid>
        </Box>
    )
}