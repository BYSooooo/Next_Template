import { AttachFile, Chat, Login, Person } from "@mui/icons-material";
import { Box, List, Paper, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";
import main from '../../../public/asset/main.png';
import { Swiper } from 'swiper';

export default function MessengerDetail() {


    const swiper = new Swiper({
        
    })

    return (
        <Box>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Description
            </Typography>
            <Paper sx={{ px : 2, mb : 2, rowGap : 1 }}>
                <List>
                    <DetailListItem icon={<Chat />} text="Chatting with Other Users"/>
                    <DetailListItem icon={<AttachFile />} text="Attach File in Chatting" />
                    <DetailListItem icon={<Person />} text="Manage User Information" />
                    <DetailListItem icon={<Login />} text="Login by External Account" />
                </List>
            </Paper>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Architecture
            </Typography>
            <Paper sx={{ px : 2, rowGap : 1}}>
                ...
            </Paper>
            <Typography variant="subtitle2" fontWeight={'bold'}>
                Preview
            </Typography>
            <Paper sx={{ px : 2, rowGap : 1}}>
                
            </Paper>
        </Box>
        
        
    )
}