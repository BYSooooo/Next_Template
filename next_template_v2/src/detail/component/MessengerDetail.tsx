import { AttachFile, Chat, Login, Person } from "@mui/icons-material";
import { Box, List, Paper, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";
import main from '../../../public/asset/main.png';

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'

import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image";


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
                <Swiper navigation={true} modules={[Navigation]}>
                    <SwiperSlide>
                        <Image 
                            src={main}
                            alt="Preview01"
                            layout="responsive"
                        />
                    </SwiperSlide>
                </Swiper>
            </Paper>
        </Box>
        
        
    )
}