import { Box, Container } from "@mui/material"
import { getDetail } from "../../../components/fetchData"

export default function DetailPage({params} : {params : {id : string}}) {
    const getDetailInfo = async()=> await getDetail(params.id).then((result)=> {return result})
    
    return (
        <Container 
            fixed
            sx={{
                minWidth : 1024,
                height : '100vh',
                mt : '1rem',
                textAlign : 'center'}}>
            <Box 
                width="50%"
                sx={{
                    color : 'red',
                    
                }}
                >

            </Box>
        </Container>
    )
}