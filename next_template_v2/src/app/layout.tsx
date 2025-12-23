import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Roboto } from 'next/font/google';

import MainBar from '../bar/MainBar';

import { InitColorSchemeScript } from '@mui/material';
import StoreProvider from './StoreProvider';
import DetailPage from '../detail/DetailPage';

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
                <StoreProvider>
                    <InitColorSchemeScript attribute='class' defaultMode='system' />
                    <AppRouterCacheProvider options={{ enableCssLayer : false}}>
                        <MainBar />
                        {children}
                        <DetailPage /> 
                    </AppRouterCacheProvider>
                </StoreProvider>
            </body>
        </html>
    )
}