import { Title } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";

export default function Page() {
    return (
            <Grid container sx={{ mt : 3}} spacing={2}>

                <Card>
                    <Typography 
                        fontStyle={"italic"}
                        fontFamily={"system-ui"}>
                            This is Card Header
                    </Typography>
                    <CardHeader>
                        
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
                <Card>
                    <Typography>
                        This is Card Header
                    </Typography>
                </Card>
            </Grid>
        
    )
}