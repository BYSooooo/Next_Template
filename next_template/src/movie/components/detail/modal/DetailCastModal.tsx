import React from 'react';

import Typography from '@mui/material/Typography';

import { useAppSelector } from '@/redux/hook';
import { getCastInfo } from '../../FetchData';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function DetailCastModal() {
    const detailModal = useAppSelector((state) => state.detailModal);
    const [cast, setCast] = React.useState<PersonInfo>(null)
    
    React.useEffect(()=> {
        getPersonInfo()
        
    },[])

    const getPersonInfo = () => {
        getCastInfo(detailModal.value[0]).then((result) => {
            setCast(result)
        })
        
    }
    console.log(cast)

    return (
        <Container sx={{ p : 1, width : '30vw', height : '30vw'}}>
            { cast ? 
                <Stack direction='column'>
                    <Stack component='div' direction='row'>
                        <Typography>
                            {cast.name}
                        </Typography>
                    </Stack>
                </Stack>
                :
                <Stack direction='row' alignItems='center' justifyContent='center'>
                    <CircularProgress />
                </Stack>
                
            }
            
        </Container>
        
    )
}