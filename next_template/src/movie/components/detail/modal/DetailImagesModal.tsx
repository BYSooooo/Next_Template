import React from 'react';

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useAppSelector } from "@/redux/hook";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import ImageIcon from '@mui/icons-material/Image';
import { Link } from '@mui/material';

export default function DetailImagesModal() {
    const detailModal : ImageInfo = useAppSelector((state)=> state.detailModal.value[0]);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [selected, setSelected] = React.useState<ImageType[]>([]);
    const [loadImage, setLoadImage] = React.useState("");
    const category = tabIndex === 0 ? detailModal.posters : detailModal.backdrops

    React.useEffect(()=> {
        setSelected(category);
    },[detailModal, tabIndex])
    
    const changeCategory =(index: number)=> {
        switch(index) {
            case 0 : 
                setSelected(detailModal.posters)
            case 1 : 
                setSelected(detailModal.backdrops);
        }
    }
    const onTabChange = (event:React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex)
        changeCategory(newIndex)
        setLoadImage("")
    }
    
    return ( detailModal ? 
                <Container>
                <Tabs variant='fullWidth' value={tabIndex} onChange={onTabChange}>
                    <Tab label={`Poster (${detailModal.posters.length})`} value={0}/>
                    <Tab label={`Backdrop (${detailModal.backdrops.length})`} value={1}/>
                </Tabs>
                <Stack direction='row' justifyContent='center' sx={{ p : 1}}>
                    {loadImage ? 
                    <Link href={`https://image.tmdb.org/t/p/original${loadImage}`} target='_blank' rel='noreferrer'>
                        <Box 
                            component="img" 
                            boxShadow={3}
                            sx={tabIndex === 0 
                                ? { borderRadius : 2, width : 'auto', height : 400, '&:hover' : { backgroundColor : 'black', filter : 'brightness(70%)'}} 
                                : { mt : 11, mb : 11, borderRadius : 2, width : 400, height : 'auto', '&:hover' : { backgroundColor : 'black', filter : 'brightness(70%)'}}
                                }
                            src={`https://image.tmdb.org/t/p/w780${loadImage}`}  
                        />
                        </Link>
                    :
                        <Box 
                            boxShadow={3}
                            sx={{ borderRadius : 2, width : 400, height : 400 }}
                            display='flex' justifyContent='center' alignItems='center'>
                                <Stack direction='column' alignItems='center'>
                                    <ImageIcon sx={{ width : 80, height : 80, color : 'gray'}} />
                                    <Typography variant='h6'>
                                        Not Selected
                                    </Typography>
                                </Stack>
                        </Box>
                    }
                </Stack>
                <Stack direction='row' overflow='scroll' width="100%" spacing={1}>
                    {selected.map((item) => {
                        return (
                            <Box key={item.file_path} sx={{ boxShadow : 3}}>
                                <Card key={item.file_path} sx={{minWidth : 100, minHeight: 100}}>
                                    <CardActionArea onClick={()=>setLoadImage(item.file_path)}>
                                        <CardMedia
                                            sx={{ width : 100 ,height : 100}}
                                            component='img'
                                            image={`https://image.tmdb.org/t/p/w780${item.file_path}`}>
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>

                            </Box>
                        )
                        })  
                    }
                </Stack>
                </Container>
            
            :
            <Grid container direction='row' width={600} height={600} alignItems='center' justifyContent='center' >
                <CircularProgress />
            </Grid>
            
        )
}