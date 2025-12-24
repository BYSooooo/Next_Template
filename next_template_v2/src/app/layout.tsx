import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Roboto } from 'next/font/google';

import MainBar from '../bar/MainBar';

import { ThemeProvider } from '@mui/material/styles';
import { InitColorSchemeScript } from '@mui/material';
import StoreProvider from './StoreProvider';
import DetailPage from '../detail/DetailPage';
import theme from '../theme/theme';

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
        <html lang="en" suppressHydrationWarning> 
            <body>
                <InitColorSchemeScript attribute='data-mui-color-scheme' />
                <StoreProvider>
                    <AppRouterCacheProvider options={{ enableCssLayer : false}}>
                        <ThemeProvider theme={theme} defaultMode='system'>
                            <MainBar />
                            {children}
                            <DetailPage /> 
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </StoreProvider>
            </body>
        </html>
    )
}