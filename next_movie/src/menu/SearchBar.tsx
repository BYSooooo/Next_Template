"use client"

import React, { ChangeEvent } from 'react';
import { Search } from "@mui/icons-material";
import { ClickAwayListener, IconButton, Input, InputAdornment, TextField } from "@mui/material";
import { useRouter } from 'next/navigation';
import MoviePopper from '../common/popper/MoviePopper';


export default function SearchBar() {
    const [inputValue, setInputValue] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement|null>(null)
    const router = useRouter();
    const clickAwayHandler = ()=> setAnchorEl(null)

    const onClickSearch = (event : React.MouseEvent<HTMLElement>)=> {
        inputValue.trim().length > 0
        ? router.push(`/search/${inputValue.trim()}`)
        : setAnchorEl(event.currentTarget)
        
    }

    const onChangeSearchInput = (event : ChangeEvent<HTMLInputElement>)=> {
        setInputValue(event.target.value)
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
            placeholder="Search"
            color="primary"
            size="small"
            endAdornment={
              <InputAdornment position="end">
                    <IconButton 
                        size="small"
                        edge="start"
                        onClick={(e)=>onClickSearch(e)}>
                        <Search />
                    </IconButton>
              </InputAdornment>  
            }>
        </Input>
    )
}