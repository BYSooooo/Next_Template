import { Roboto } from 'next/font/google';

import MainBar from '../bar/MainBar';

import { InitColorSchemeScript } from '@mui/material';
import StoreProvider from './StoreProvider';
import DetailPage from '../detail/DetailPage';
import MuiProvider from './MuiProvider';

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
                <InitColorSchemeScript attribute='class' />
                <StoreProvider>
                    <MuiProvider>
                        <MainBar />
                        {children}
                        <DetailPage /> 
                    </MuiProvider>
                </StoreProvider>
            </body>
        </html>
    )
}