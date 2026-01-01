import { AttachFile, Chat, Login, Person } from "@mui/icons-material";
import { Box, List, Paper, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";

//Static image
import image02 from '../../../public/asset/msg02.png';
import image03 from '../../../public/asset/msg03.png';
import image04 from '../../../public/asset/msg04.png';
import image05 from '../../../public/asset/msg05.png';
import Carousel from "./Crousel";

import Mermaid from '../../mermaid/Mermaid';

export default function MessengerDetail() {

    const messengerArch = `
        architecture-beta
            group server(material:database)[Server]
            group next(material:next)[Next]            

            service redux(material:redux-action)[Redux Toolkit] in next
            service tail(material:tailwindcss)[Tailwind CSS] in next
            service fire(material:firebase)[Firebase] in server
            service react(material:react)[React] in next
            service node(material:nodejs)[Nodejs] in next

            fire:R -- L:node
            node:T -- B:redux
            redux:R -- T:react
            node:R -- L:react
            react:R -- L:tail
    `;

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
            <Paper sx={{ p: 1, rowGap: 1}}>
                <Carousel data={[image02, image03, image04, image05]} />
            </Paper>
            <Typography variant="subtitle1" fontWeight={'bold'}>
                Architecture
            </Typography>
            <Paper sx={{ px : 2, rowGap : 1}}>
                <Mermaid chart={messengerArch} />
            </Paper>
        </Box>
        
        
    )
}