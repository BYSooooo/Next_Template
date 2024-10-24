
import React from 'react';
import { Box, Chip, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppSelector } from "../redux/hooks";

export default function ResultOverview({theme, selectedSort} : {theme : boolean, selectedSort : Function}) {
    const searchReducer = useAppSelector((state)=> state.searchReducer);
    const [selected, setSelected] = React.useState("movie");
    const handleListItemClick = (selList : string)=> {
        setSelected(selList)
    }

    React.useEffect(()=> {
        selectedSort(selected)
    },[selected])

    return (
        <Box
            width="20%" 
            height="20rem"
            mt="2rem"
            sx={{
                borderRadius : 4,
                bgcolor : theme ? grey[900] : grey[100],
                p : 2
            }}> 
            <List>
                <ListItem
                    sx={{ my : 1}} 
                    disablePadding>
                    <ListItemButton
                        disabled={searchReducer.movie.total_results === 0 ? true : false}
                        selected={selected === "movie"} 
                        onClick={()=> handleListItemClick("movie")}
                        sx={{ borderRadius : 4}}>
                        <ListItemText primary="Movie"/>
                        <Chip label={searchReducer.movie.total_results} size="small"/>
                    </ListItemButton>
                </ListItem>
                <ListItem 
                    sx={{ my : 1}}
                    disablePadding>
                    <ListItemButton
                        disabled={searchReducer.person.total_results === 0 ? true : false}
                        selected={selected === "person"} 
                        sx={{ borderRadius : 4}}
                        onClick={()=>handleListItemClick("person")}>
                        <ListItemText primary="Person" />
                        <Chip label={searchReducer.person.total_results} size="small"/>
                    </ListItemButton>
                </ListItem>
                <ListItem
                    sx={{ my : 1}} 
                    disablePadding>
                    <ListItemButton
                        disabled={searchReducer.collection.total_results === 0 ? true : false}
                        selected={selected === "collection"} 
                        sx={{ borderRadius : 4}}
                        onClick={()=> handleListItemClick("collection")}>
                        <ListItemText primary="Collection" />
                        <Chip label={searchReducer.collection.total_results} size="small" />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    sx={{ my : 1}} 
                    disablePadding>
                    <ListItemButton
                        disabled={searchReducer.company.total_results === 0 ? true : false}
                        selected={selected === "company"} 
                        sx={{ borderRadius : 4}}
                        onClick={()=> handleListItemClick("company")}>
                        <ListItemText primary="Company" />
                        <Chip label={searchReducer.company.total_results} size="small"/>
                    </ListItemButton>
                </ListItem>
            </List>
                
        </Box>   
    )
}