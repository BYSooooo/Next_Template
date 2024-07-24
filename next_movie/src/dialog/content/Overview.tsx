import { Box, Button, DialogActions, DialogContent, DialogTitle, Skeleton, Typography } from "@mui/material";
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
                    display : 'flex',
                    borderRadius : 4 }}>
                    { movieSlice.poster_path 
                        ? <img 
                            style={{
                                borderRadius : 5,
                                width : "7rem",
                            }}
                            alt={movieSlice.original_title}
                            src={`https://image.tmdb.org/t/p/w500${movieSlice.poster_path}&fit=crop`}/>
                        : <Skeleton />
                    }
                    
                    <Box sx={{
                        mx : 3
                    }}>
                        <Typography sx={{ }}>
                            {movieSlice.title}
                        </Typography>
                        <Typography>
                            {movieSlice.release_date}
                        </Typography>
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