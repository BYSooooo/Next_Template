import './globals.css';

import Footer from './footer';
import Header from './Header';

export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
        <html lang="en">
            <body className='@container'>
                <Header />
                {children}
                <Footer/>
            </body>
        </html>
    )
}