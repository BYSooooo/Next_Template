import { AttachFile, Chat, Login, Person } from "@mui/icons-material";
import { Box, List, Paper, Stack, Typography } from "@mui/material";
import DetailListItem from "./DetailListItem";

/* Static Image */
import image01 from '../../../public/asset/movie01.png';
import image02 from '../../../public/asset/movie02.png';
import image03 from '../../../public/asset/movie03.png';
import image04 from '../../../public/asset/movie04.png';

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
                {/* <Swiper 
                    direction="vertical"
                    navigation={true} modules={[Navigation]}>
                    <SwiperSlide>
                        <Image src={image01} alt="Preview01" height={100}  /> 
                    </SwiperSlide>
                     <SwiperSlide>
                        <Image src={image02} alt="Preview02"  height={100}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={image03} alt="Preview03"  /> 
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={image04} alt="Preview04"/>
                    </SwiperSlide>
                </Swiper> */}
            </Paper>
        </Box>
        
        
    )
}