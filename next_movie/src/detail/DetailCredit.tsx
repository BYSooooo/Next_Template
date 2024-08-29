import { Person } from "@mui/icons-material";
import { alpha, Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function DetailCredit({theme, path,sort} : {theme : boolean, path? : {cast : Cast[], crew : Crew[]}, sort: "Cast" | "Crew"}) {
    const selectedSort = path ? ((sort === "Cast") ? path?.cast : path?.crew) : []
    
    const onClickImageListItem = (id : number)=> {
        console.log(id)
    }

    return (
        <Box
            textAlign='start' 
            sx={{
                mt : 1,
                px : 2
            }}>
            <Typography
                variant='h6'
                fontWeight='bold' 
                display={'inline'}>
                {`${sort} (${path ? selectedSort.length : 0})`}
            </Typography>
            <Box width="100%" overflow="scroll">
                <Box>
                    <ImageList
                        gap={10} 
                        cols={path && selectedSort.length}>
                        {selectedSort.length > 0 && 
                            selectedSort.map((info : any )=> {
                                return ( info && (
                                        <ImageListItem 
                                            sx={{
                                                width : 130,
                                                borderRadius : 4,
                                                display : 'inline-flex',
                                                overflow : 'hidden',
                                                ":hover" : {
                                                    cursor : 'pointer',
                                                }
                                            }}
                                            key={sort === "Cast" ? info.cast_id : info.credit_id}>
                                            {info.profile_path ? (
                                                <img
                                                    onClick={()=>onClickImageListItem(sort === "Cast" ? info.cast_id : info.credit_id)} 
                                                    src={`https://image.tmdb.org/t/p/w185${info.profile_path}`} />
                                            ) : (
                                                <Box
                                                    textAlign="center"
                                                    justifyContent="center"
                                                    height="100%"
                                                    bgcolor={theme ? grey[800] : grey[200]}>
                                                    <Person sx={{ mt : '40%', fontSize : '70px'}} />
                                                </Box>
                                            )}
                                            
                                            <Box
                                                position='absolute'
                                                bottom='0'
                                                sx={{
                                                    width : "100%", 
                                                    paddingInline : 1,
                                                    bgcolor : theme ? alpha('rgb(0,0,0)',0.5) : alpha('rgb(255,255,255)',0.5),
                                                    
                                                }}>
                                                <Typography variant="subtitle2" noWrap >
                                                    {info.name}
                                                </Typography>
                                                <Typography 
                                                    variant="subtitle2" noWrap>
                                                    {sort === "Cast" ? info.character : info.known_for_department}
                                                </Typography>
                                            </Box>
                                        </ImageListItem>
                                )   
                                )
                            })
                        }
                    </ImageList>    
                </Box>
            </Box>
            


        </Box>
    )
}