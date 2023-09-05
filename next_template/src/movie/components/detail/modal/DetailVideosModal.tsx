import React from 'react';

import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

import { useAppSelector } from "@/redux/hook";
import { OndemandVideo, PlayDisabled } from '@mui/icons-material';

import ReactPlayer from 'react-player';

export default function DetailVideosModal() {
    const detailModal = useAppSelector((state)=> state.detailModal.value[0])
    const [selected, setSelected] = React.useState<VideoInfo[]>([])
    const [openVideo, setOpenVideo] = React.useState("");
    const [videoName, setVideoName] = React.useState("");

    React.useEffect(()=> {
        setSelected(detailModal)
    },[detailModal])

    const onClick = (item : VideoInfo)=> {
        setOpenVideo(item.key);
        setVideoName(item.name)
    }

    return ( detailModal ? 
        <Container sx={{ paddingTop : 1, pb : 1}}>
            <Box minHeight='2rem' sx={{ mb : 1}} >
                <Typography variant='h6' fontWeight='bold' noWrap>
                    {videoName ? videoName : ""}
                </Typography>
            </Box>
            <Box height='50vh' width='100%' sx={{ mb : 2}}>
                { openVideo ?
                    <ReactPlayer height='50vh' width='auto'
                        url={`https://www.youtube.com/watch?v=${openVideo}`} />
                 :  <Grid container width='100%' height='50vh' direction='column' alignItems='center' justifyContent='center'>
                        <PlayDisabled sx={{ width : 100, height : 100, color : 'gray'}} />
                        <Typography>
                            Not Selected
                        </Typography>
                    </Grid>
                }
            </Box>
            <Typography variant='subtitle1'>
                List
            </Typography> 
            <Stack direction='row' overflow='scroll' width="100%" spacing={1}>

                {selected.map((item)=> {
                    return (
                        <Box key={item.id} sx={{ boxShadow : 1}}>
                            <Card sx={{minWidth : 100, minHeight: 100}}>
                                <CardActionArea onClick={()=> onClick(item)}> 
                                    <Stack direction='column' sx={{ width : 100 , height : 100}} justifyContent='center' alignItems='center'>
                                        <OndemandVideo sx={{ width : 30, height : 30}} />
                                        <Typography variant='caption' align='center'>
                                            {item.type}
                                        </Typography>
                                    </Stack>
                                </CardActionArea>
                            </Card>
                        </Box>
                    )
                })}
            </Stack>
        </Container>
        
        :
        <Grid container direction='row' width={600} height={600} alignItems='center' justifyContent='center' >
            <CircularProgress />
        </Grid>
    )
}