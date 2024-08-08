
import { Box, Skeleton } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export default function DetailInfo({theme,path}:{theme: boolean, path : MovieDetail}) {

    return (
        <>
            {path ? (
                <Box 
                    ml={1}
                    width="100%" 
                    bgcolor={theme ? grey[900]: grey[100] }
                    borderRadius={4}
                    >
                    <Box 
                        height="50%"
                        display='flex' 
                        flexDirection='row'
                        justifyContent='space-between'>
                        <Box width="33%" bgcolor={'red'}>
                            column1
                        </Box>
                        <Box width="33%" >
                            column2
                        </Box>
                        <Box width="33%" >
                            column3
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Skeleton 
                    variant="rectangular" 
                    width="100%"
                    sx={{
                        ml : 1
                    }}/>
            )}
        
        </>
    )
}