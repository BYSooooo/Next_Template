import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts';
import { Person, Star } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material';


export default function DetailStatic({detail} : {detail : MovieDetail}) {

    const gridStyle : SxProps<Theme>= {
        height : '25vh',
        borderRadius : '0.5rem',
        backgroundColor : 'ghostwhite',
        p : 1 
     }
    return (
        <Paper elevation={3} sx={{borderRadius : "0.5rem", height : 'auto', mt : 1, p: 1}}>
            <Typography variant='h6' fontWeight='bold'>
                Statics
            </Typography>
            <Grid container direction='row' columnGap={1} rowGap={1} justifyContent='center' >
                <Grid 
                    xs={12} md={2.5} direction='column'
                    sx={gridStyle}>
                    <Typography variant='body2' sx={{color : "gray"}} >
                        Rating
                    </Typography>
                    <Grid container direction='column' alignItems='center' rowGap={2} sx={{mt : 2}}>
                        <Star sx={{color : 'gold', width : 40, height : 40}}/>
                        <Typography variant='h4' fontWeight='bold'>
                            {detail.vote_average.toPrecision(3)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid 
                    xs={12} md={2.5} direction='column'
                    sx={gridStyle}>
                    <Typography variant='body2' sx={{color : "gray"}} >
                        Vote Amount
                    </Typography>
                    <Grid container direction='column' alignItems='center' rowGap={2} sx={{mt : 2}}>
                        <Person sx={{color : 'green', width : 40, height : 40}}/>
                        <Typography variant='h4' fontWeight='bold'>
                            {detail.vote_count.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    xs={12} md={2.5} direction='column'
                    sx={gridStyle}>
                    <Typography variant='body2' sx={{color : "gray"}} >
                        Budget / Revenue
                    </Typography>
                    <Grid container direction='column' justifyContent='center' alignItems='center'>
                        <Grid md={6}>
                            <BarChart
                                viewBox={{ x : -50, y : 0 }}
                                legend={{hidden : true}}
                                margin={{top : -15, bottom : 20}}
                                leftAxis={null}
                                width={150}
                                height={100}
                                bottomAxis={null}
                                series={[
                                    { data : [detail.budget], label : 'Budget', color : 'orange'}, 
                                    { data : [detail.revenue], label : 'Revenue', color : 'yellowgreen'},
                            ]}
                                xAxis={[{ scaleType : 'band',data : ['Cost ($)'], disableTicks: false }]}
                            />
                        </Grid> 
                        <Grid md={6}>
                            
                            <Typography variant='h4' fontWeight='bold' color={detail.revenue /detail.budget > 1 ? 'green' : 'red'}>
                                { detail.revenue === 0 || detail.budget === 0 
                                    ? 'No Data'
                                    : (Math.round(detail.revenue / detail.budget * 100)- 100)+'%'
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Paper>
    )
}