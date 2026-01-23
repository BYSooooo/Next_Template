import './globals.css';

import Footer from './footer';
import HeaderBar from '@/header/HeaderBar';


export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <HeaderBar />
                {children}
                <Footer/>
            </body>
        </html>
    )
}