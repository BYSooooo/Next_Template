
import * as React from 'react';

import Input from "@mui/material/Input";
import Grid from '@mui/material/Unstable_Grid2';

import SearchBtn from './SearchBtn';
import CriteriaBtn from '../CriteriaBtn';
import { useAppSelector } from '@/redux/hook';
import Container from '@mui/material/Container';

export default function MainSearch() {
    const [keyword, setKeyword] = React.useState("");
    const searchFilter = useAppSelector((state)=> state.searchFilter);

    React.useEffect(()=> {
        const index = searchFilter.findIndex(filter => filter.name === 'keyword')
        setKeyword(searchFilter[index].value)
    },[])

    const onChange =(e: { target: { value: React.SetStateAction<string>; }; }) => {
        setKeyword(e.target.value)
    }

    return (
        <Container> 
            <Grid container spacing={2} direction='row'> 
                <Grid xs={12} md={2}>
                    <CriteriaBtn />
                </Grid>
                <Grid xs={12} md={8}>
                    <Input fullWidth onChange={onChange} value={keyword}/>
                </Grid>
                <Grid xs={12} md={2}>
                    <SearchBtn keyword={keyword}/>
                </Grid>
            </Grid>       
        </Container>
    )
}