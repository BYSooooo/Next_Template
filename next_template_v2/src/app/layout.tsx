import MainBar from '../bar/MainBar';

import { InitColorSchemeScript } from '@mui/material';
import StoreProvider from './StoreProvider';
import DetailPage from '../detail/DetailPage';
import MuiProvider from './MuiProvider';

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