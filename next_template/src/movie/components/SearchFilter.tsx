import { delSelectedGenre, setSelectedGenre } from "@/redux/features/movieReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Box, Chip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

export default function SearchFilter() {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
    const selGenreList : MovieGenreInfo[] = useAppSelector((state) => state.selectedGenre)
    const dispatch = useAppDispatch();

    function onClickAddGenre(genre : MovieGenreInfo){
        dispatch(setSelectedGenre(genre))    
        console.log(genre)
    }
    const onClickDelGenre = (genreId : number) => {
        dispatch(delSelectedGenre(genreId))        
    }
    const checkSelList = (genreId : number) => {
        const check = selGenreList.findIndex((genre) => genre.id === genreId)
        return check === -1 ? false : true ;
        
    }

    console.log(selGenreList)
    return (
        <Box sx={{ width : "100%"}} >
            <Grid container direction='column'>
                <Box sx={{ paddingInline : "2rem"}}>
                    <Typography>
                        Genre
                    </Typography>
                    <Grid direction='row'>
                        {genreList.map((genre : MovieGenreInfo) => {
                            return (
                                <Chip
                                    sx={{ margin : "0.3rem" }} 
                                    label={genre.name} 
                                    onClick={() => onClickAddGenre(genre)}
                                    disabled={checkSelList(genre.id)}
                                />
                            )
                        })}
                    </Grid>
                </Box>
                

            </Grid>
        </Box>
    )
}