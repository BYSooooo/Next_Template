import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { SxProps, Theme } from '@mui/material/styles';
import { getCollection } from '../../FetchData';
import { Title } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hook';
import { closeDetailModal } from '@/redux/features/movieReducer';

const gridStyle : SxProps<Theme>= {
    height : 'auto',
    borderRadius : '0.5rem',
    backgroundColor : 'ghostwhite',
    p : 1 
 }

 const fetchCollection = async (id : string) => {
    try {
        const result = getCollection(id)
        return result;
    } catch (err) {
        console.log(err)
        throw new Error ("Error")
    }
 }

export default function DetailCollection({detail} : {detail: MovieDetail}) {
    const [collection, setCollection] = React.useState<CollectionInfo>(null);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const onClick =(id : number) => {
        dispatch(closeDetailModal());
        router.push(`/movie/detail/${id}`)
    }

    React.useEffect(()=> {
        const collectionId = detail.belongs_to_collection.id.toString()
        fetchCollection(collectionId)
            .then((results)=> { setCollection(results)})
    },[detail])

    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1, p: 1}}>
            <Typography variant='h6' fontWeight='bold'>
                Collection
            </Typography>
            <Grid container direction='row' columnGap={1} rowGap={1} justifyContent='center' >
                <Grid md={3} xs={12} direction='column' sx={gridStyle}>
                    <Typography variant='body2' sx={{color : 'gray'}}>
                        Name
                    </Typography>
                    <Grid container direction='column' alignItems='center' rowGap={2} sx={{mt : 2}}>
                        <Title sx={{width : 40, height : 40, color : 'gray'}} />
                        <Typography variant='subtitle1' textAlign='center'>
                            {collection?.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid md={8} xs={12} sx={gridStyle}>
                    <Typography variant='body2' sx={{color : 'gray'}}>
                        List
                    </Typography>
                    <Stack  direction='row' overflow='scroll' sx={{ height : 'auto', width : 'auto'}} columnGap={1}>
                        {collection?.parts.map((item)=> {
                            return (
                                <Card key={item.id} sx={{ width : 'auto', height : 'auto', minWidth : 92}} >
                                    <CardActionArea onClick={()=> onClick(item.id)}>
                                        <Box >
                                            <CardMedia
                                                component='img'
                                                image={`https://image.tmdb.org/t/p/w92${item.poster_path}`}>
                                            </CardMedia>
                                        </Box>
                                    </CardActionArea>
                                </Card>
                            )
                        })}
                    </Stack>

                </Grid>
            </Grid>
        </Paper>
    )
}