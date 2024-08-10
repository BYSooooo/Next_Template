import { Tag } from "@mui/icons-material"
import { Box, Chip } from "@mui/material"

export default function GenreList ({genreList} : {genreList : Genre[]}) {
    
    return (
        <Box flexDirection={'column'}>   
            <Box>
                {genreList.map((genre)=>{
                    return (
                        <Chip
                            key={genre.id}
                            size="small"
                            icon={ <Tag sx={{ fontSize : 'small'}} /> }
                            label={genre.name} 
                            sx={{
                                my : 1
                            }}
                        />
                    )
                })}            

            </Box>
        </Box>
    )
}