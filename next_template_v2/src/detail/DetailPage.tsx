'use client';

import { Container, Drawer, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { onCloseDetail } from "../redux/features/detailSlice";
import MessengerDetail from "./component/MessengerDetail";
import MovieDetail from "./component/MovieDetail";

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
                width : { xs : 300, sm : 400, md : 500}
            }
        }

    return (
        <Drawer
            anchor={drawerAnchor}
            open={detailSlice.openYn} 
            onClose={onCloseDrawer}
            sx={drawerStyle}>
            <Container>
                <Typography fontWeight={'bold'} variant="h4">
                    {detailSlice.component}
                </Typography>
                {switchPage()}
            </Container>
        </Drawer>
    )
}