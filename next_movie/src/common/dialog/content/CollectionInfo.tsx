import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { controlDialog } from "../../../redux/features";

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


                        </Box>

                        
                    </Box>
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