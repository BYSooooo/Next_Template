import React from 'react';
import { Box, Chip, ListItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AssignmentInd, CalendarMonth, Photo } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../redux/hooks';
import { controlDialog } from '../redux/features';

export default function SearchItem({theme, sort, item} : {theme : boolean, sort : string, item : any}) {
    const [itemContent, setItemContent] = React.useState<{poster : string, title : string, overview : string, chips? : string}>()
    const dispatch = useAppDispatch();
    const router = useRouter();
    React.useEffect(()=> {
        posterHandler()
    },[sort, item])

    const posterHandler = ()=> {
        switch(sort) {
            case "movie" : 
                setItemContent({ 
                    poster : item.poster_path, 
                    title : item.title, 
                    overview : item.overview,
                    chips : item.release_date 
                })
                break;
            case "person" : 
                setItemContent({ 
                    poster : item.profile_path, 
                    title : item.name, 
                    overview : "",
                    chips : item.known_for_department
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
                    chips : item.headquarters 
                })
                break;
            default : break;
        }
    }

    const chipHandler =()=> {
        switch (sort) {
            case 'movie' : 
                return (
                    <Chip 
                        
                        size='small'
                        sx={{ width : 'fit-content', px : 0.5, mb : 2}}
                        component={'span'}
                        icon={<CalendarMonth />}
                        label={itemContent?.chips}
                    />
                )
            case 'person' : 
                return (
                    <Chip 
                        size='small'
                        sx={{ width : 'fit-content', px : 0.5, mb : 2}}
                        component={'span'}
                        icon={<AssignmentInd />}
                        label={itemContent?.chips}
                    />
                )
            default : break;
        }
    }

    const onClickItem = ()=> {
        switch(sort) {
            case "movie" : 
                router.push(`/detail/${item.id}`)
                break;
            case "person" : 
                dispatch(controlDialog({ openYn : true, name : "Cast", extraInfo : item.id}))
                break;
            case "collection" : 
                dispatch(controlDialog({ openYn : true, name : "Collection", extraInfo : item.id}))
                break;
            case "company" :
                dispatch(controlDialog({ openYn : true, name : "Company", extraInfo : item.id}))
                break;
            default : break;
        }   
    }

    return (
        <ListItem 
            sx={{
                ":hover" : {
                    cursor : 'pointer',
                    opacity : '70%'
                }
            }}
            onClick={onClickItem}>
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
                    width="100%">
                    <Typography variant="h6" fontWeight="Bold">
                        {itemContent?.title}
                    </Typography>
                    {chipHandler()}
                    <Box
                        width="100%"
                        height="50%"
                        borderRadius={3}
                        p={1}
                        bgcolor={theme ? grey[800]: grey[200] }>
                        <Typography 
                            sx={{
                                overflow : 'hidden',
                                textOverflow : 'ellipsis',
                                display : '-webkit-box',
                                WebkitLineClamp : '2',
                                WebkitBoxOrient : 'vertical'
                            }}>
                            {itemContent && (
                                itemContent?.overview?.length ? (
                                    itemContent?.overview
                                ) : (
                                    "* No Overview"
                                )
                            )}
                        </Typography>
                    </Box>    
                </Box>
            </Box>
        </ListItem>
    )
}