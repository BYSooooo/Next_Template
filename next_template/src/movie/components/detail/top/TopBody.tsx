import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material';
import { boxStyle } from '@/movie/layouts/DetailMain';


export default function TopBody({detail} : {detail : MovieDetail}) {
    const getCastName =( item : CrewInfo[], dept : string) => {
        let person = []
        item.map((i)=> {
            if(i.job === dept) { 
                person.push(i.name)
            }
        })
        return person;
    }
    
    return (
        <Grid container direction='column' rowGap={2}>
            <Grid md={3.5}>
                <Box sx={boxStyle}>
                    <Typography variant='body2' sx={{color : "gray"}}>
                        Director
                    </Typography>
                    {getCastName(detail.credits.crew, 'Director').map((crewName)=> {
                        return (
                            <Typography variant='body1' key={crewName}>
                                {crewName}
                            </Typography>
                        )
                    })}
                </Box>
            </Grid> 
            <Grid md={5} xs={6}>
                <Box sx={boxStyle}>
                    <Typography variant='body2' sx={{color : "gray"}}>
                        Genres
                    </Typography>
                    <Grid container direction='row'>
                        {detail.genres.map((genre)=> {
                            return (
                                <Grid key={genre.id}>
                                    <Typography key={genre.id} variant='body2'>
                                        {genre.name}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Grid>
            <Grid xs={12}>
                <Box sx={boxStyle} >
                    <Stack direction='column'>
                        <Typography variant='body2' sx={{color : "gray"}} >
                            Overview
                        </Typography>
                        <Grid>
                            <Typography variant='body2'>
                                {detail.overview}
                            </Typography>
                        </Grid>
                    </Stack>
                </Box>
            </Grid>   
        </Grid>
                        
    )
}