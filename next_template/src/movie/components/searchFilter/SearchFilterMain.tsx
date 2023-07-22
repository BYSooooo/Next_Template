import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import GenreFilter from "./GenreFIlter";
import ReleaseDateFilter from "./ReleaseDateFilter";
import RateFilter from "./RateFilter";

export default function SearchFilterMain() {

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