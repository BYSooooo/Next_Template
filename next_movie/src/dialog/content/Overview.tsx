import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { controlDialog } from "../../redux/features";

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
                    width : "20rem",
                    overflow : "hidden",
                    borderRadius : 4
                }}>
                    <img 
                        alt={movieSlice.original_title}
                        src={`https://image.tmdb.org/t/p/w500${movieSlice.poster_path}&fit=crop`}/>
                    
                </Box>
            </DialogContent>
            <DialogActions>
                <Button >More</Button>
                <Button onClick={()=>onClickClose()}>Close</Button>
            </DialogActions>
        </>
    )
}