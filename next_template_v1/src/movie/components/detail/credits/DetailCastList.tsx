import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DetailCreditsCard from './DetailCreditsCard';

export default function DetailCastList({casts} : {casts : CastInfo[] }) {
    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1, p: 1}}>
            <Typography variant='h6' fontWeight='bold'>
                Cast ({casts.length})
            </Typography>
            <Grid container direction='row' justifyContent='center' rowGap={1} columnGap={1} sx={{ mt: 1}}>
                {casts.map((cast) => {
                    return (
                        <DetailCreditsCard key={cast.id} info={cast} />
                    )
                })}
            </Grid>
        </Paper>
    )
}