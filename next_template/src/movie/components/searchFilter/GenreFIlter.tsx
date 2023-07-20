import React from 'react'
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Unstable_Grid2";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeFilter, delSelectedGenre, setSelectedGenre } from "@/redux/features/movieReducer";

import DoneIcon from '@mui/icons-material/Done'
import onClickAllCheckBox from './ClickAllCheckBox';
import Chip from '@mui/material/Chip';


export default function GenreFilter() {
    const genreList : MovieGenreInfo[] = useAppSelector((state) => state.movieGenre);
    const selGenreList : MovieGenreInfo[] = useAppSelector((state) => state.selectedGenre);
    const useSearchFilter : {name : string, useFilter : boolean}[] = useAppSelector((state) => state.searchFilter);
    const dispatch = useAppDispatch();

    const filterState = useSearchFilter[useSearchFilter.findIndex((item) => item.name === "genre")]

    

    const checkSelList = (genreId : number) => {
        const check = selGenreList.findIndex((genre) => genre.id === genreId)
        return check === -1 ? false : true ;
        
    }

    function onClickAddGenre(genre : MovieGenreInfo){
        /** if Genre not selected, add Store */
        if(selGenreList.findIndex(
            (selected) => selected.id === genre.id) === -1) {
            dispatch(setSelectedGenre(genre))
        /** if Genre seleted already, delete in Store*/    
        } else {
            dispatch(delSelectedGenre(genre.id))
        }    
    }
  
    return (
        <Grid container direction='column' sx={{width : "45%", m: 0.5}}>    
            <Grid container direction='row' alignItems='Center' sx={{pl : "1rem"}}>
                <Typography sx={{ mr: "1rem"}}> 
                    Genre
                </Typography>
                <FormControlLabel control={<Checkbox checked={filterState.useFilter} onChange={()=> onClickAllCheckBox("genre",!filterState.useFilter)} />} label="All"/>
            </Grid>
            <Grid direction='row'>
                <Box sx={{ m: 1, p : 1, border : '1px solid gray', borderRadius : "1rem"}}>
                    {genreList.map((genre : MovieGenreInfo) => {
                        return (
                            <Chip
                                icon={checkSelList(genre.id) === true ? <DoneIcon /> : null}
                                sx={{ margin : "0.3rem" }} 
                                label={genre.name} 
                                onClick={() => onClickAddGenre(genre)}
                                color={checkSelList(genre.id) === true ? "primary" : "default" }
                                disabled={filterState.useFilter}
                            />
                        )
                    })}
                </Box>
            </Grid>
        </Grid>
    )
}