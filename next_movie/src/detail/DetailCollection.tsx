import { SentimentDissatisfied } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../redux/hooks";
import { controlDialog } from "../redux/features";

export default function DetailCollection({theme,path} : {theme : boolean, path : MovieDetail}) {
    const dispatch = useAppDispatch();

    const collectionFetch = async(colId : number)=> {
        dispatch(controlDialog({openYn : true, name : "Collection", extraInfo : colId}))
    }

    const onClickCollection =()=> {
        if(path.belongs_to_collection) {
            collectionFetch(path.belongs_to_collection.id);
        }
    }


    return (
        <Box width="45%" flexDirection='column' >
            <Box display='flex' flexDirection='column' alignItems='start'>
                <Typography variant="h6" fontWeight='bold' sx={{ mt : 1, px :2}}>
                    Collection
                </Typography>
                { path ? (
                    <Box
                        mt={1}
                        display='flex'
                        justifyContent="center"
                        width = "100%"
                        height = "15rem">
                        { path.belongs_to_collection ? (
                            <>
                                <Box
                                    borderRadius={4}
                                    width = "100%"
                                    overflow='hidden'
                                    zIndex={-1}
                                    sx={{
                                        backgroundImage : `url(https://image.tmdb.org/t/p/original${path.belongs_to_collection.backdrop_path})`,
                                        backgroundSize : "100%",
                                        backgroundRepeat : 'no-repeat',
                                        opacity : 0.5,
                                    }} 
                                />
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ position : 'absolute', mt : 5, zIndex : 1, display : "flex", flexDirection: "column"}}>
                                    <Avatar
                                        sx={{
                                            width : "5rem", 
                                            height : "5rem",
                                            opacity : 1,
                                        }}
                                        src={`https://image.tmdb.org/t/p/w500${path.belongs_to_collection.poster_path}`}
                                    />
                                    <Typography variant="h5" noWrap fontWeight="Bold">
                                        {path.belongs_to_collection.name}
                                    </Typography>
                                    <Button
                                        onClick={onClickCollection} 
                                        sx={{ 
                                            borderRadius : 2, 
                                            bgcolor : theme ? grey[800] : grey[300],
                                            color : theme ? "white" : "black"}}>
                                        Detail
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            
                            <Box
                                borderRadius={4}
                                width = "100%"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                bgcolor={ theme ? grey[800] : grey[200]} >
                                <SentimentDissatisfied 
                                    sx={{ 
                                        fontSize : "7rem",
                                        color : grey[500] 
                                    }}
                                />
                                <Typography variant="h5">
                                    No Collection
                                </Typography>
                            </Box>
                            
                        )}
                    </Box>

                ) : (
                    <Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}