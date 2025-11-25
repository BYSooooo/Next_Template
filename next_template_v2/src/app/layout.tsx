import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { Roboto } from 'next/font/google';
import MainBar from '../bar/MainBar';
import { InitColorSchemeScript } from '@mui/material';
import ThemeRegister from '../theme/ThemeRegister';

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
                <AppRouterCacheProvider options={{ enableCssLayer : false}}>
                    <ThemeRegister>
                        <InitColorSchemeScript attribute='class' />
                        <MainBar />
                        {children}
                    </ThemeRegister>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}