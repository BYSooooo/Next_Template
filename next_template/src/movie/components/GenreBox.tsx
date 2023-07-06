import { Chip } from "@mui/material";
import React from "react";

export default function GenreBox({id, name} : {id : number, name : string}) {

    return (
        <Chip key={id} label={`${name}`}color="primary" variant="outlined"/>
    )

}