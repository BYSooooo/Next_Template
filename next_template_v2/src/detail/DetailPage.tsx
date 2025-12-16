'use client';

import { Box, Button, Drawer, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { onCloseDetail } from "../redux/features/detailSlice";
import MessengerDetail from "./component/MessengerDetail";
import MovieDetail from "./component/MovieDetail";
import { Close } from "@mui/icons-material";

export default function DetailPage() {
    const detailSlice = useAppSelector((state)=> state.detailSlice);
    const dispatch = useAppDispatch();
    
    const theme = useTheme();
    const screenSmYn = useMediaQuery(theme.breakpoints.down('sm'));


    const onCloseDrawer = ()=> {
        dispatch(onCloseDetail())
    }

    const switchPage = ()=> {
        switch(detailSlice.component) {
            case "Messenger" : 
                return <MessengerDetail />
            case "Movie" : 
                return <MovieDetail />
            default : 
                return null;
        }
    }

    const drawerAnchor = screenSmYn ? 'bottom' : 'right'
    const drawerStyle = screenSmYn
        ? {
            '$ .MuiDrawer-paper' : {
                width : '100vw',
                height : '100vh'
            }
        } : {
            '$ .MuiDrawer-paper' : {
                width : { xs : 300, sm : 400, md : 500 },
                height : '100vh'
            }
        }

    return (
        <Drawer
            anchor={drawerAnchor}
            open={detailSlice.openYn} 
            onClose={onCloseDrawer}
            sx={drawerStyle}>
            <Stack sx={{ height : '100%', p : 2}}>
                { screenSmYn 
                    ? <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}> 
                        <Typography fontWeight={'bold'} variant="h4">
                            {"Next " + detailSlice.component}
                        </Typography>
                        { screenSmYn && <Close />}
                        </Stack>
                    
                    :   <Typography fontWeight={'bold'} variant="h4">
                            {"Next " + detailSlice.component}
                        </Typography>
                }
                
                <Box sx={{ flexGrow : 1, overflowY : 'auto'}}>
                    {switchPage()}
                </Box>
            </Stack>
            <Box sx={{ p : 1}}>
                <Button
                    href={detailSlice.url}
                    fullWidth 
                    variant="contained"
                    target="_blank">
                    Move
                </Button>
            </Box>
        </Drawer>
    )
}