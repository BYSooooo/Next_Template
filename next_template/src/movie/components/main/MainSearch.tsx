
import * as React from 'react';

import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField  from '@mui/material/TextField';

import { useAppSelector } from '@/redux/hook';

import SearchBtn from './SearchBtn';
import CriteriaBtn from '../CriteriaBtn';

export default function MainSearch() {
    const [keyword, setKeyword] = React.useState("");
    const [keydown, setKeydown] = React.useState(false)
    const searchFilter = useAppSelector((state)=> state.searchFilter);
    const filterState = searchFilter[searchFilter.findIndex((item)=> item.name === 'keyword')]

    React.useEffect(()=> {
        setKeydown(false);
    },[])
    
    React.useEffect(()=> {
        const preState = filterState.value
        setKeyword(preState)
    },[searchFilter])

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
                        onKeyDown={(event) => {
                            (event.key === 'Enter' && setKeydown(true))
                            console.log(keydown)
                            console.log(event.key)
                        }} 
                        focused
                        placeholder='Search...'
                        color='primary'
                        size='small'
                        fullWidth 
                        onChange={onChange} 
                        value={keyword} 
                        InputProps={{
                            endAdornment : (
                                <SearchBtn keyword={keyword} keydown={keydown} />
                            )
                        }}/>
                </Box>
            </Stack>
        </Container>
    )
}