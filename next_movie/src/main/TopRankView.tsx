import React from 'react';
import { Box, Typography } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';

export default function TopRankView({detail, sort} : {detail: movieOverview, sort : "popular" | "topRate" | "upcomming"}) {

    const switcher = ()=> {
        switch(sort){
            case 'popular' : 

        }
    }

    return (
        <Box 
            textAlign={'start'} 
            flexDirection={'row'}
            sx={{
                p : 1,
                width : "100%",
                height : "30vw", 
                borderRadius : 3,
                bgcolor : 'white',
                }}>
            <Box sx={{
                display : 'inline-flex',
                borderRadius : 4 
                }}>
                <img
                    style={{
                        borderRadius : 4,
                        height : "23vw"
                    }} 
                    alt={detail.original_title}
                    src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} 
                />

            </Box>
            {/* <Typography variant='h5'>
                {detail.title}
            </Typography> */}
        </Box>    
    )
}