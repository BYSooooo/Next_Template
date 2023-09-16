import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DetailCompanyCard from './DetailCompanyCard';

export default function DetailCompanyList({company} : {company : CompanyInfo[]}) {
    const [themeMode, setThemeMode] = React.useState('')

    window.addEventListener('stroage', ()=> {
        setThemeMode(window.localStorage.getItem('mode'))
    })    

    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1, p: 1}}>
            <Typography variant='h6' fontWeight='bold'>
                Production ({company.length})
            </Typography>
            <Grid container direction='row' justifyContent='center' rowGap={1} columnGap={1} sx={{ mt : 1}}>
                {company.map((comp)=> {
                    return (
                        <DetailCompanyCard key={comp.id} company={comp} mode={themeMode}/>
                    )
                })}
            </Grid>
        </Paper>
    )
}