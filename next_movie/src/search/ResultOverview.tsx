
import React from 'react';
import { Box, Chip, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppSelector } from "../redux/hooks";

export default function ResultOverview({theme} : {theme : boolean}) {
    const searchReducer = useAppSelector((state)=> state.searchReducer);
    const [selected, setSelected] = React.useState(0);
    const handleListItemClick = (index : number)=> {
        setSelected(index)
    }

    return (
        <Box
            width="20%" 
            height="20rem"
            sx={{
                borderRadius : 4,
                bgcolor : theme ? grey[700] : grey[300],
                p : 2
            }}> 
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === 0} 
                        onClick={()=> handleListItemClick(0)}
                        sx={{ borderRadius : 4}}>
                        <ListItemText primary="Movie"/>
                        <Chip label={searchReducer.movie.total_results} size="small"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === 1} 
                        sx={{ borderRadius : 4}}
                        onClick={()=>handleListItemClick(1)}>
                        <ListItemText primary="Person" />
                        <Chip label={searchReducer.person.total_results} size="small"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === 2} 
                        sx={{ borderRadius : 4}}
                        onClick={()=> handleListItemClick(2)}>
                        <ListItemText primary="Collection" />
                        <Chip label={searchReducer.collection.total_results} size="small" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === 3} 
                        sx={{ borderRadius : 4}}
                        onClick={()=> handleListItemClick(3)}>
                        <ListItemText primary="Company" />
                        <Chip label={searchReducer.company.total_results} size="small"/>
                    </ListItemButton>
                </ListItem>
            </List>
                
        </Box>   
    )
}