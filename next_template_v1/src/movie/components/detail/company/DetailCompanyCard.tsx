import React from 'react';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';


import { Business, Language } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import Home from '@mui/icons-material/Home';


export default function DetailCompanyCard({company, mode} : {company : CompanyInfo, mode : string}) {

    const getCompanyLogo= () =>{
        const logoYn = company.logo_path ? true : false;
        return ( logoYn 
            ? 
            <Avatar 
                sx={{ width : 70, height : 70 }} 
                src={`https://image.tmdb.org/t/p/original${company.logo_path}`}/>
            :
            <Avatar sx={{ width : 70, height : 70 }}>
                <Business sx={{ width : 30, height : 30}}/>
            </Avatar>

        )
    }

    const companyIcon = () => {
        const homepageYn = company.homepage ? true : false;
        return ( homepageYn 
            ?
            <Tooltip title="Visit HomePage">
                <Link href={company.homepage} target='_blank' rel='noreferrer' position='absolute'>
                    <Home sx={{ width: 30, height : 30, color : mode === 'light' ? 'black' : 'white'}}/>
                </Link> 
            </Tooltip> 
            :
            <Tooltip title="No Information">
                <Home sx={{ width: 30, height : 30, color : "gray"}} />
            </Tooltip>
        )
    }

    return (
        <Card key={company.id} sx={{ width :350, height : 120 }} variant='outlined'>
            <Stack direction='column' sx={{width : 350, height : 120}} justifyContent='center'>    
                <Stack direction='row' sx={{ width : 340, height : 100}} justifyContent='end' position='absolute'>
                    {companyIcon()}
                </Stack>
                <Stack direction='row' sx={{ paddingInline : 1}} columnGap={1}>
                    {getCompanyLogo()}
                    <Stack direction='column' rowGap={0.3}>
                        <Typography variant="body1" >
                            {company.name}
                        </Typography>
                        <Typography variant='subtitle2' color='gray'>
                            {company.headquarters}
                        </Typography>
                    </Stack>

                </Stack>
                
            
            </Stack>
        </Card>
    )
}