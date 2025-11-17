import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import MainBar from '../bar/MainBar';

const roboto = Roboto({
    weight : ['300', '400', '500', '700'],
    subsets : ['latin'],
    display : 'swap',
    variable : '--font-roboto'
});

export default function RootLayout({children} : {
    children : React.ReactNode
}) {
    return (
        <html lang="en" className={roboto.variable}> 
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <MainBar />
                       {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}