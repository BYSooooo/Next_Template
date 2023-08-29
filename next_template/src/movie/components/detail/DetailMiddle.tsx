import React from 'react';

import Stack from '@mui/material/Stack';

import { SxProps, Theme} from '@mui/material';
import { useAppSelector } from '@/redux/hook';

import DetailCrew from './middle/DetailCrew';
import DetailStatic from './middle/DetailStatic';
import DetailMedia from './middle/DetailMedia';
import DetailCollection from './middle/DetailCollection';

export default function DetailMiddle() {
    const movieDetail = useAppSelector((state)=>state.movieDetail);
    const [detail, setDetail] = React.useState<MovieDetail>(null);
    React.useEffect(()=> {
        setDetail(movieDetail[0])
    },[movieDetail])
    console.log(detail)

    const gridStyle : SxProps<Theme>= {
        border : '2px solid grey',
        borderRadius : '0.5rem',
        height : 160,
        overflow : '-moz-hidden-unscrollable'
    }

    return (
        <Stack direction='column'>
            { detail && <DetailCrew credit={detail.credits}/> }
            { detail && <DetailStatic detail={detail}/>}
            { detail && <DetailMedia detail={detail}/>}
            { detail && detail.belongs_to_collection && <DetailCollection detail={detail}/>}
        </Stack>
    )
}