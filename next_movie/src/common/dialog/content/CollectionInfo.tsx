import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { controlDialog } from "../../../redux/features";
import { grey } from "@mui/material/colors";

export default function CollectionInfo({theme} : {theme : boolean}) {
    const dispatch = useAppDispatch();
    const dialogReducer = useAppSelector((state)=> state.dialogReducer.extraInfo)

    const onClickClose = ()=> {
        dispatch(controlDialog({ openYn : false, name : ""}))    
    }
    return (
        <>
            <DialogTitle>
                Collection
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row" >
                        <Box
                            component="img"
                            borderRadius={4}
                            src={`https://image.tmdb.org/t/p/w780${dialogReducer.poster_path}`}
                            width={"10rem"}>
                            
                        </Box>
                        <Box display='flex' flexDirection='column' mx={2}>
                            <Typography variant="h6" fontWeight="bold" noWrap>
                                {dialogReducer.name}
                            </Typography>
                            <Typography 
                                variant='subtitle2'
                                sx={{ color : theme ? grey[500]: grey [700] }}>
                                Preview
                            </Typography>
                            <Box
                                borderRadius={4}
                                bgcolor={theme ? grey[800] : grey[200]}
                                sx={{ p : 2 }}>
                                <Typography >
                                    {dialogReducer.overview}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box flexDirection="column">
                    <Typography variant='subtitle1' fontWeight='bold'> 
                        Movie List
                    </Typography>
                    {dialogReducer.parts.map((item : MovieOverview)=> {
                        return (
                            <Box>
                                {item.original_title}
                            </Box>
                        )
                    })}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> onClickClose()}>
                    Close
                </Button>
            </DialogActions>
        </>
    )
}