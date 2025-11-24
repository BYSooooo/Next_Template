import { ThemeProvider } from "@mui/material/styles"
import theme from '../theme/theme';

export default function Page() {
    return (
        <ThemeProvider theme={theme}>
            <h1>In progress...</h1>
        </ThemeProvider>
    )
}