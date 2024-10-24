import React from 'react';
import { Box, ListItem, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Photo } from '@mui/icons-material';

export default function SearchItem({theme, sort, item} : {theme : boolean, sort : string, item : any}) {
    const [itemContent, setItemContent] = React.useState<{poster : string, title : string, overview : string, chips? : any[]}>()

    React.useEffect(()=> {
        posterHandler()
    },[])

    const posterHandler = ()=> {
        switch(sort) {
            case "movie" : 
                setItemContent({ 
                    poster : item.poster_path, 
                    title : item.title, 
                    overview : item.overview,
                    chips : [{
                        genres_ids : item.genres_ids as string[], 
                        release_date : item.release_date as string,
                    }]
                })
                break;
            case "person" : 
                setItemContent({ 
                    poster : item.profile_path, 
                    title : item.name, 
                    overview : "",
                    chips : [{
                        known_for_department : item.known_for_department as string,
                        gender : item.gender as string,
                    }]
                })
                break;
            case "collection" : 
                setItemContent({ 
                    poster : item.poster_path, 
                    title : item.name, 
                    overview : item.overview,
                });
                break;
            case "company" :
                setItemContent({ 
                    poster : item.logo_path, 
                    title : item.name, 
                    overview : item.description,
                    chips : [{
                        original_country : item.original_country as string|null,
                        headquarters : item.headquarters as string
                    }]
                })
                break;
            default : break;
        }
    }

    

    return (
        <ListItem>
            <Box
                bgcolor={theme ? grey[900] : grey[100]}
                borderRadius={4}
                width="100%"
                height="9rem"
                display={"flex"}
                flexDirection={"row"}
                p={1.5}>
                <Box mr="1rem">
                    {itemContent?.poster ? (
                        <img
                            style={{
                                borderRadius : 5,
                                width : "5rem"
                            }} 
                            src={`https://image.tmdb.org/t/p/w500${itemContent?.poster}`}
                        />
                    ):(
                        <Box 
                            width="5rem" 
                            height="7rem"
                            bgcolor={theme ? grey[800] : grey[200] }
                            borderRadius={3}
                            justifyContent={"center"}
                            display="flex"
                            alignItems={"center"}>
                            <Photo sx={{ width : "2rem", height : "2rem"}}/>
                        </Box>
                    )}
                </Box>
                <Box 
                    display={"flex"} 
                    flexDirection={"column"}
                    width="80%">
                    <Typography variant="h6" fontWeight="Bold">
                        {itemContent?.title}
                    </Typography>
                    <Box>
                        {}
                    </Box>
                </Box>
                
            </Box>
        </ListItem>
    )
}