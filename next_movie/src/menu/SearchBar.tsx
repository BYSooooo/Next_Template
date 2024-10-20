"use client"

import React, { ChangeEvent } from 'react';
import { Search } from "@mui/icons-material";
import { IconButton, Input, InputAdornment, TextField } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [inputValue, setInputValue] = React.useState("");
    const [inputStatus, setInputStatus] = React.useState(false)
    const router = useRouter();
    
    React.useEffect(()=> {
        setInputStatus(false);
    },[])

    const onClickSearch = ()=> {
        if(inputValue.trim().length > 0) {
            router.push(`/search/${inputValue.trim()}/1`)
            setInputStatus(false)
        } else {
            setInputStatus(true)
        }
    }

    const onChangeSearchInput = (event : ChangeEvent<HTMLInputElement>)=> {
        setInputValue(event.target.value)
        setInputStatus(false)
    }

    

    return (
        <Input
            sx={{
                '& .MuiInputBase-input' : {
                    width : '13rem',
                    transition : '0.5s ease-in-out',
                    '&:focus' : {
                        width : '20rem'
                    }
                }
            }}
            onChange={onChangeSearchInput}
            value={inputValue}
            onKeyDown={(event)=> {
                event.key === 'Enter' && onClickSearch()
            }}
            placeholder="Search"
            color="primary"
            size="small"
            error={inputStatus}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton 
                        size="small"
                        edge="start"
                        onClick={onClickSearch}>
                        <Search />
                    </IconButton>
                </InputAdornment>  
            }>
        </Input>
    )
}