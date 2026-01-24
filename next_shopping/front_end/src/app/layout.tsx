import './globals.css';

import Footer from './footer';
import HeaderBar from '@/component/header/HeaderBar';
import SearchBar from '@/component/search/SearchBar';


export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <HeaderBar />
                <SearchBar />
                {children}
                <Footer/>
            </body>
        </html>
    )
}