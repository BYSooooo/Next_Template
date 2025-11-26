import { Title } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Container, Typography } from "@mui/material";

export default function Page() {
    return (
        <Container>
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
        </Container>
        
    )
}