
import * as React from 'react';

import Input from "@mui/material/Input";
import Grid from '@mui/material/Unstable_Grid2';

import SearchBtn from '../components/SearchBtn';
import CriteriaBtn from '../components/CriteriaBtn';

export default function MainSearch() {
    const [keyword, setKeyword] = React.useState("");

    const onChange =(e: { target: { value: React.SetStateAction<string>; }; }) => {
        setKeyword(e.target.value)
    }

    return (
        <div> 
            <Grid container spacing={2} direction='row'> 
                <Grid xs={2}>
                    <CriteriaBtn />
                </Grid>
                <Grid xs={8}>
                    <Input fullWidth onChange={onChange}/>
                </Grid>
                <Grid xs={2}>
                    <SearchBtn keyword={keyword}/>
                </Grid>
            </Grid>       
        </div>    
    )
}