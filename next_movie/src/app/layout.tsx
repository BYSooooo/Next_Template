import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import StoreProvider from '../redux/StoreProvider';
import TopBar from '../menu/TopBar';


export const metadata = {
    title : "Next Movie | Next Template"
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {


    return (
      <html lang="en">
        <body>
            <AppRouterCacheProvider>
                <StoreProvider>
                    <ThemeProvider theme={theme}>
                      <TopBar />
                        {children}
                    <CssBaseline />
                    </ThemeProvider>
                </StoreProvider>
            </AppRouterCacheProvider>
        </body>
      </html>
    )
  }