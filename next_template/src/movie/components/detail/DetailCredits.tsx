import React from 'react';

import Stack from '@mui/material/Stack';
import DetailCastList from './credits/DetailCastList';
import DetailCrewList from './credits/DetailCrewList';
import { useAppSelector } from '@/redux/hook';

export default function DetailCredits() {
    const movieDetail = useAppSelector((state)=> state.movieDetail);
    const [detail, setDetail] = React.useState<MovieDetail>(null);
    
    React.useEffect(()=> {
        setDetail(movieDetail[0])
    },[movieDetail])
    
    return (
        <Stack direction='column'>
            {detail && <DetailCastList casts={detail.credits.cast}/>}
            {detail && <DetailCrewList crews={detail.credits.crew}/>}
        </Stack>
    )
}