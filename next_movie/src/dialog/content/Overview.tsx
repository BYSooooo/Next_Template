import { Box, Button, Chip, DialogActions, DialogContent, DialogTitle, List, Skeleton, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { controlDialog } from "../../redux/features";
import { CalendarMonth, Star } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function Overview() {
    const dispatch = useAppDispatch()
    const movieSlice = useAppSelector((state)=> state.dialogReducer.extraInfo);
    const onClickClose =()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))
    };

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
                            width : "8rem",
                        }}
                        alt={"Loading..."}
                        src={`https://image.tmdb.org/t/p/w500${movieSlice.poster_path}&fit=crop`}/>
                        <Stack 
                            sx={{ mx : 3, width : "15rem", rowGap : 1}}
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
                        </Stack>                    
                        
                </Box>
            </DialogContent>
            <DialogActions>
                <Button >More</Button>
                <Button onClick={()=>onClickClose()}>Close</Button>
            </DialogActions>
        </>
    )
}