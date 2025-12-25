'use client';

import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import theme from '../theme/theme';

export default function MuiProvider({children} : {children : React.ReactNode}) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer : false}}>
            <ThemeProvider theme={theme} defaultMode="system">
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}