import { Add } from "@mui/icons-material"
import { Avatar, Box, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

export default function DetailCompany({theme, path} : {theme: boolean, path : MovieDetail}) {

    return (
        <Box width="45%" flexDirection='column' >
            <Box display='flex' flexDirection='column' alignItems='start' >
                <Typography variant="h6" fontWeight='bold' sx={{ mt : 1, px :2}}>
                    Company
                </Typography>
                <Box
                    mt={1}
                    display="flex"
                    flexDirection={"row"}
                    borderRadius={4}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width = "100%"
                    height = "15rem"
                    bgcolor={theme ? grey[800] : grey[200]}>
                    {path && path.production_companies.map((item,idx)=> {
                        return ( idx < 3 &&
                            <Box
                                borderRadius={4}
                                bgcolor={ theme ? grey[700] : grey[300]}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                flexDirection={"column"}
                                width="20%"
                                height="60%"
                                sx={{ m : 1  }}
                                key={item.id}
                                textOverflow={"-moz-initial"}>
                                <Avatar 
                                    sx={{ backgroundColor : theme ? "white" : "none2", mb : 1}}
                                    src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}>
                                </Avatar>
                                <Typography variant="subtitle2">
                                    {item.name}
                                </Typography>
                            </Box>
                        )
                    })}
                    <Box
                        borderRadius={4}
                        bgcolor={ theme ? grey[700] : grey[300]}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        width="20%"
                        height="60%"
                        sx={{ 
                            m : 1, 
                            ':hover' : { 
                                cursor : "pointer",
                                bgcolor : theme ? grey[600] : grey[400]
                                }
                            }}
                        >
                        <Add/>
                        <Typography fontWeight={"bold"}>
                            More
                        </Typography>
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    )
}