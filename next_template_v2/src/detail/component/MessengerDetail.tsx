import { AttachFile, Chat, Login, Person } from "@mui/icons-material";
import { Box, List, Paper, Stack, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";

//Static image
import image02 from '../../../public/asset/msg02.png';
import image03 from '../../../public/asset/msg03.png';
import image04 from '../../../public/asset/msg04.png';
import image05 from '../../../public/asset/msg05.png';
import Carousel from "./Crousel";



export default function MessengerDetail() {

    

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
            <Typography variant="subtitle2" fontWeight={'bold'}>
                Preview
            </Typography>
            <Paper sx={{ px : 2, rowGap : 1}}>
                <Carousel data={[image02, image03, image04, image05]} />
            </Paper>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Architecture
            </Typography>
            <Paper sx={{ px : 2, rowGap : 1}}>
                ...
            </Paper>
        </Box>
        
        
    )
}