
import * as React from 'react';
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Grid from '@mui/material/Unstable_Grid2';
import FilterBtn from '../components/FilterBtn';
import { useAppSelector } from '@/redux/hook';
import SearchBtn from '../components/SearchBtn';

export default function MainSearch() {

    return (
        <div> 
            <Grid container spacing={2} direction='row'> 
                <Grid xs={2}>
                    <FilterBtn />
                </Grid>
                <Grid xs={8}>
                    <Input fullWidth />
                </Grid>
                <Grid xs={2}>
                    <SearchBtn />
                </Grid>
            </Grid>       
        </div>    
    )
}