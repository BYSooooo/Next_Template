import { Chip } from "@mui/material";
import React from "react";


export default function GenreBox({id, name} : {id : number, name : string}) {

    return (
        <Chip sx={{mb : 1}} key={id} label={`${name}`}color="primary" variant="outlined"/>
    )

}