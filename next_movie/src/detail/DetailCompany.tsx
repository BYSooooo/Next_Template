import { Add } from "@mui/icons-material"
import { Avatar, Box, ImageList, ImageListItem, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useAppDispatch } from "../redux/hooks"
import { controlDialog } from "../redux/features";
import { getCompany } from "../components/fetchData";

export default function DetailCompany({theme, path} : {theme: boolean, path : MovieDetail}) {
    const dispatch = useAppDispatch();
    const onClickCompany = (company : CompanyInfo)=> {
        getCompany(company.id)
            .then((result)=> {
                dispatch(controlDialog({openYn : true, name : 'Company', extraInfo : result}))
            })
    }

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
                    <Box width="100%" overflow='scroll' display='flex' >
                        <ImageList cols={path ? path.production_companies.length : 0} >
                            {path && path.production_companies.map((item)=> {
                                return (
                                    <ImageListItem key={item.id}>
                                        <Box
                                            borderRadius={4}
                                            bgcolor={ theme ? grey[700] : grey[300]}
                                            display={"flex"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            flexDirection={"column"}
                                            sx={{ 
                                                width : 100,
                                                height : 150,
                                                mx : 2 ,
                                                ":hover" : {
                                                    cursor : 'pointer',
                                                    bgcolor : theme ? grey[600] : grey[400]
                                                } }}
                                            onClick={()=>onClickCompany(item)}
                                            textOverflow={"-moz-initial"}>
                                            <Avatar 
                                                sx={{ backgroundColor : theme ? "white" : "none2", mb : 1}}
                                                src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}>
                                            </Avatar>
                                            <Typography variant="subtitle2">
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    </ImageListItem>    
                                )
                            })}
                        </ImageList>
                    </Box> 
                </Box>
            </Box>
        </Box>
    )
}