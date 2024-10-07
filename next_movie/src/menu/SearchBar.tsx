"use client"

import React, { ChangeEvent } from 'react';
import { Search } from "@mui/icons-material";
import { IconButton, Input, InputAdornment, TextField } from "@mui/material";


export default function SearchBar() {
    const [inputValue, setInputValue] = React.useState("");

    const onClickSearch = ()=> {

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
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
              </InputAdornment>  
            }>
        </Input>
    )
}