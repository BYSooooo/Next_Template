import './globals.css';

import Footer from './footer';
import HeaderBar from '@/component/header/HeaderBar';
import ModalMain from '@/component/modal/ModalMain';


export default function RootLayout({children} : {children : React.ReactNode}) {
    
    return (
        <html lang="en">
            <body>
                <div className='relative flex flex-col min-h-screen'>
                    <header className='w-full'>
                        <HeaderBar />
                    </header>
                    {children}
                    <ModalMain />
                    <Footer/>
                </div>
            </body>
        </html>
    )
}