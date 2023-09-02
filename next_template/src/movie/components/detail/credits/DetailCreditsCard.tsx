import React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import { useAppDispatch } from '@/redux/hook';
import { closeDetailModal, openDetailModal } from '@/redux/features/movieReducer';


export default function DetailCreditsCard ({info} : {info : CastInfo | CrewInfo}) {
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        dispatch(closeDetailModal());
    },[info])

    const profileImage = () => {
        const imageYn = info.profile_path ? true : false;
        return ( imageYn ? 
            <Avatar 
                sx={{ width : 60, height : 60}} 
                src={`https://image.tmdb.org/t/p/w185${info.profile_path}`} />
            :
            <Avatar sx={{ width : 60, height : 60}}>
                {info.name.slice(0,1)}
            </Avatar>
        )
    }
    const setText = () => {
        switch (info.kind) {
            case "Cast" :
                return info.character;
            case "Crew" : 
                return info.known_for_department;
        }
    }

    const onClick = (castId : number)=> {
        dispatch(openDetailModal({name : "Cast", value : castId}))
    }


    return (
        <Card key={info.id} sx={{display : 'block', width: 350, height : 106}} variant='outlined' onClick={()=>onClick(info.id)}>
            <CardActionArea>
                <Stack direction='row' width={350} height={106} alignItems='center' sx={{ paddingInline : 1}}>
                    {profileImage()}
                    <Stack direction='column' sx={{ paddingInline : 1}} width="100%">
                        <Typography variant='h6'>
                            {info.name}
                        </Typography>
                        <Typography variant='subtitle1' color='gray'>
                            {setText()}
                        </Typography>
                    </Stack>
                </Stack>
                
            </CardActionArea>
                
        </Card>
    )

}