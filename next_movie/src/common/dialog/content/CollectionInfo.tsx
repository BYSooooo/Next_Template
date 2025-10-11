"use client";

import { Box, Button, DialogActions, DialogContent, DialogTitle, ImageList, ImageListItem, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { controlDialog } from "../../../redux/features";
import { grey } from "@mui/material/colors";
import { Movie } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

export default function CollectionInfo({theme} : {theme : boolean}) {
    const [collection, setCollection] = React.useState<CollectionInfo>();
    const dispatch = useAppDispatch();    
    const collectionId = useAppSelector((state)=> state.dialogReducer.extraInfo);
    const router = useRouter();

    const onClickMovie = (id : number)=> {
        dispatch(controlDialog({ openYn : false, name : ""}));
        router.push(`/detail/${id}`)
    }

    React.useEffect(()=> {
        getCollection()
    },[collectionId])

    const getCollection = async()=> {
        const response = await ( await fetch(`/api/collection/${collectionId}`)).json();
        if(response) {
            const data = await response.json();
            setCollection(data);

        }
    }

    return (
        <>
            <DialogTitle>
                Collection
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" mb={1}>
                    <Box display="flex" flexDirection="row" >
                        <Box
                            component="img"
                            borderRadius={4}
                            src={`https://image.tmdb.org/t/p/w780${dialogReducer.poster_path}`}
                            width={"10rem"}>
                            
                        </Box>
                        <Box display='flex' flexDirection='column' mx={2}>
                            <Typography variant="h6" fontWeight="bold" noWrap>
                                {collection.name}
                            </Typography>
                            <Typography 
                                variant='subtitle2'
                                sx={{ color : theme ? grey[500]: grey [700] }}>
                                Preview
                            </Typography>
                            <Box
                                borderRadius={3}
                                width="100%"
                                height="12rem"
                                overflow="scroll"
                                bgcolor={theme ? grey[700] : grey[300]}
                                sx={{ p : 2 }}>
                                <Typography >
                                    {collection.overview}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box flexDirection="column">
                    <Typography variant='subtitle1' fontWeight='bold'> 
                        Movie List
                    </Typography>
                    <ImageList cols={10}>
                        {collection.parts.map((item : MovieOverview)=> {
                            return (
                                <ImageListItem
                                    sx={{
                                        width : 60,
                                        borderRadius : 4,
                                        overflow : 'hidden',
                                        display : 'inline-flex',
                                        mx : 0.5,
                                        ":hover" : {
                                            cursor : 'pointer'
                                        }
                                    }}>
                                {item.poster_path ? (
                                    <img
                                        onClick={()=> onClickMovie(item.id)}
                                        src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}>
                                    
                                    </img>
                                ) : (
                                    <Box 
                                        height="100%"
                                        display="flex" 
                                        flexDirection='column'
                                        justifyContent="center" 
                                        alignItems='center'>
                                        <Movie />
                                        <Typography variant='caption' noWrap overflow={'inherit'}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                )}
                                </ImageListItem>
                            )
                        })}

                    </ImageList>
                </Box>
            </DialogContent>
        </>
    )
}