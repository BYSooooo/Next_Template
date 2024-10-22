import { Box, ListItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function SearchItem({theme, sort, item} : {theme : boolean, sort : string, item : any}) {
    
    const posterHandler = (path : any)=> {
        switch(sort) {
            case "movie" : 
            
                
        }

        return (
            <img
            
            />
        )
    }

    return (
        <ListItem>
            <Box
                bgcolor={theme ? grey[700] : grey[200]}
                borderRadius={4}
                width="100%"
                height="7rem"
                flexDirection={"row"}
                p={1.5}>
                {posterHandler(item)}
                
                <Typography variant="h6" fontWeight="Bold">
                    {item.name}
                </Typography>
                
            </Box>
        </ListItem>
    )
}