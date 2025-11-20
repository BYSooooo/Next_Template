import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
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
                   <InitColorSchemeScript attribute="class" />
                    <ThemeRegister>
                        <MainBar />
                        {children}
                    </ThemeRegister>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}