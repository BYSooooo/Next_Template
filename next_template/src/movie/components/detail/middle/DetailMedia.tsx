import React from 'react'
import ReactPlayer from 'react-player/lazy';

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';

import { SxProps, Theme } from '@mui/material/styles';
import { VideoLibrary, Image } from '@mui/icons-material';
import { useAppDispatch } from '@/redux/hook';
import { openDetailModal } from '@/redux/features/movieReducer';
import Box from '@mui/material/Box';

export default function DetailMedia({detail} : {detail : MovieDetail}){
    const [trailer, setTrailer] = React.useState('');
    const [backDrop, setBackDrop] = React.useState<ImageType[]>([]);
    const [poster, setPoster] = React.useState<ImageType[]>([])

    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        const idx = detail.videos.results.findIndex((item) => item.type === "Trailer") 
        setTrailer(detail.videos.results[idx]?.key)
        setBackDrop(detail.images.backdrops)
        setPoster(detail.images.posters.filter((item)=> item.iso_639_1 === 'en'))
        
    },[detail])

    const gridStyle : SxProps<Theme>= {
        height : '25vh',
        borderRadius : '0.5rem',
        backgroundColor : 'ghostwhite',
        p : 1 
     }    

     const onClick = (category : string) => {
        switch (category) {
            case "Videos" : 
                dispatch(openDetailModal({name : "Videos", value : detail.videos.results}))
                break;
            case "Images" : 
                dispatch(openDetailModal({name : "Images", value : detail.images}))
                break;
            default : 
                break;
            }
        }
    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1, p: 1}}>
            <Typography variant='h6' fontWeight='bold'>
                Media
            </Typography>
            <Grid container direction='row' alignItems='center' columnGap={1} rowGap={1}>
                <Grid xs={12} md={9.9}>
                    {trailer 
                    ? 
                        <ReactPlayer 
                        height='50vh'
                        width='auto'
                        url={`https://www.youtube.com/watch?v=${trailer}`} />
                    :
                        <Box sx={{ height : '50vh', width : 'auto'}}>
                            <Typography>
                                No Information Trailer
                            </Typography>
                        </Box>
                    }
                </Grid>
                <Grid container xs={12} md={1.9} direction='column' columnGap={1} rowGap={1} justifyContent='center'>
                    <Grid xs={12} sx={gridStyle}>
                        <Typography variant='body2' sx={{color : "gray"}} >
                            Videos
                        </Typography>
                        <Grid container direction='column' alignItems='center' rowGap={2} sx={{mt : 2}}>
                            <VideoLibrary sx={{width : 40, height: 40}} />
                            <Typography variant='h6' fontWeight='bold'>
                                +{detail.videos.results.length}
                            </Typography>
                            <Button variant='text' size='small' onClick={()=>onClick("Videos")}>
                                More
                            </Button>
                        </Grid>
                            
                    </Grid>
                    <Grid xs={12} sx={gridStyle}>
                        <Typography variant='body2' sx={{color : "gray"}} >
                            Images
                        </Typography>
                        <Grid container direction='column' alignItems='center' rowGap={2} sx={{mt : 2}}>
                            <Image sx={{ width : 40, height: 40}} />
                            <Typography variant='h6' fontWeight='bold'>
                                +{poster.length + backDrop.length}
                            </Typography>
                            <Button variant='text' size='small' onClick={()=> onClick("Images")}>
                                More
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            
            
        </Paper>
    )
}