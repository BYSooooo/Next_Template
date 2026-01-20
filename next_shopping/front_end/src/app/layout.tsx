import Footer from './footer';
import './globals.css';

export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
        <html lang="en">
            <body className='@container'>
                {children}
                <Footer/>
            </body>
        </html>
    )
}