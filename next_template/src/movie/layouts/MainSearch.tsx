
import * as React from 'react';
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Popover } from '@mui/material';

export default function MainSearch() {
    const [toggleDetail, setToggleDetail] = React.useState(false);
    const [anchorPop, setAnchorPop] = React.useState<HTMLButtonElement | null>(null);

    const onClickDetail = (event : React.MouseEvent<HTMLButtonElement>) => {
        console.log(event)
        setAnchorPop(event.currentTarget);
        setToggleDetail(!toggleDetail);
    }
    const detailPop = () => {
        return (
            <Popover open={toggleDetail} anchorEl={anchorPop} anchorOrigin={{ vertical : "bottom", horizontal : "left"}} >
                <Typography>
                    Hello
                </Typography>
            </Popover>
        )
    }
    return (
        <div> 
            <Grid container spacing={2} direction='row'> 
                <Grid xs={2}>
                    <Button sx={{ width: "100%", height : "100%" }} onClick={onClickDetail}>
                        <KeyboardArrowDown />
                        <Typography>
                            Detail
                        </Typography>
                    </Button>
                </Grid>
                <Grid xs={8}>
                    <Input fullWidth />
                </Grid>
                <Grid xs={2}>
                    <Button variant="contained" sx={{ width: "100%", height: "100%"}}>
                        Search
                    </Button>
                </Grid>
            </Grid>       
        </div>    
    )
}