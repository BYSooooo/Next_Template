import { Box, Button, Chip, DialogActions, DialogContent, DialogTitle, Skeleton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { controlDialog } from "../../redux/features";
import { CalendarMonth } from "@mui/icons-material";

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
                    <Box sx={{ mx : 3}} display={"inline-block"} width="20vw">
                        <Typography variant="h6" fontWeight="bold" noWrap={true}>
                            {movieSlice.title}
                        </Typography>
                        <Chip icon={<CalendarMonth />} label={movieSlice.release_date}/>

                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button >More</Button>
                <Button onClick={()=>onClickClose()}>Close</Button>
            </DialogActions>
        </>
    )
}