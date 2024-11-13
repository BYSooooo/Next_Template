"use client"

import { 
    Box,  
    Button,  
    Chip, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Stack, 
    Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CalendarMonth, Star, Tag } from "@mui/icons-material";
import { controlDialog } from "../../../redux/features";
import { useRouter } from "next/navigation";

export default function Overview() {
    const movieSlice = useAppSelector((state)=> state.dialogReducer.extraInfo);
    const genreSlice = useAppSelector((state)=> state.genreReducer);
    const dispatch = useAppDispatch()
    const router = useRouter();
    
    const genreName = (ids: number[])=> {
        const result = [];
        const getName = (id : number) => {
            return genreSlice.find((item) => item.id === id).name   
        }
        ids.map((item)=> result.push(getName(item)));
        if(result.length > 2) {
            result.length = 2;
            return result.join(", ")+"...";
        } else {
            return result.join(", ")
        }
    }

    const onClickMore =()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
        router.push(`/detail/${movieSlice.id}`)
    }
    
    return (
        <>
            <DialogTitle>
                Overview
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    display : 'flex',
                    borderRadius : 4 }}>
                    <img 
                        style={{
                            borderRadius : 5,
                            width : "8rem" }}
                        alt={"Loading..."}
                        src={`https://image.tmdb.org/t/p/w500${movieSlice.poster_path}&fit=crop`}/>
                    <Stack 
                        sx={{ mx : 3, width : "13rem", rowGap : 1}}
                        direction={'column'}>
                        <Typography variant="h6" fontWeight="bold" noWrap={true}>
                            {movieSlice.title}
                        </Typography>
                        <Chip
                            sx={{ width : 'fit-content'}}
                            component={'span'} 
                            icon={<CalendarMonth />} 
                            label={movieSlice.release_date}
                        />
                        <Chip 
                            sx={{ width : 'fit-content'}}
                            component={'span'} 
                            icon={<Star />} 
                            label={`${movieSlice.vote_average} / 10`} 
                        />
                        <Chip 
                            sx={{ width : 'fit-content'}}
                            component={'span'}
                            icon={<Tag />}
                            label={genreName(movieSlice.genre_ids)}
                        />
                    </Stack>                    
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> onClickMore()}>More</Button>
            </DialogActions>
        </>
    )
}