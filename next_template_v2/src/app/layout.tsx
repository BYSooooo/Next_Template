import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Roboto } from 'next/font/google';
import MainBar from '../bar/MainBar';
import ThemeRegister from '../theme/ThemeProvider';
import { InitColorSchemeScript } from '@mui/material';

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
        <html lang="en" className={roboto.variable} suppressHydrationWarning> 
            <body>
                <AppRouterCacheProvider>
                    <ThemeRegister>
                    <InitColorSchemeScript attribute="class" />
                        <MainBar />
                        {children}
                    </ThemeRegister>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}