import './globals.css';

import Footer from './footer';
import HeaderBar from '@/component/header/HeaderBar';
import SearchBar from '@/component/search/SearchBar';
import { HTMLAttributes } from 'react';


export default function RootLayout({children} : {children : React.ReactNode}) {
    const containerStyle = "max-w-screen-xl mx-auto w-full px-6"
    
    return (
        <html lang="en">
            <body>
                <div className='relative flex flex-col min-h-screen'>
                    <header className='w-full'>
                        <HeaderBar />
                    </header>
                    <SearchBar />
                    {children}
                    <Footer/>
                </div>
            </body>
        </html>
    )
}