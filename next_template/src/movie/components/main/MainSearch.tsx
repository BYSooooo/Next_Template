
import * as React from 'react';

import Input from "@mui/material/Input";
import Grid from '@mui/material/Unstable_Grid2';

import SearchBtn from './SearchBtn';
import CriteriaBtn from '../CriteriaBtn';
import { useAppSelector } from '@/redux/hook';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField  from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon  from '@mui/icons-material/Search';

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
    const filterCount = ()=> {
        const count = searchFilter.filter((item)=> item.useFilter === true).length - 1
        return count
    }

    return (
        <Container> 
            <Stack direction='row' width="100%" columnGap={1}>
                <Box sx={{ flexGrow : 0}}>
                    <Badge badgeContent={filterCount()} color="error">
                        <CriteriaBtn />
                    </Badge>
                </Box>
                <Box sx={{ flexGrow : 1 }}>
                    <TextField 
                        focused
                        color='primary'
                        size='small'
                        fullWidth 
                        onChange={onChange} 
                        value={keyword} 
                        InputProps={{
                            endAdornment : (
                                <SearchBtn keyword={keyword}/>
                            )
                        }}/>
                </Box>
            </Stack>
        </Container>
    )
}