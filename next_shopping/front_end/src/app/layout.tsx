import './globals.css';

import Footer from './footer';
import HeaderBar from '@/component/header/HeaderBar';
import ModalMain from '@/component/common/modal/ModalMain';
import AlertMain from '@/component/common/alert/AlertMain';
import ToastMain from '@/component/common/toast/ToastMain';


export default function RootLayout({children} : {children : React.ReactNode}) {
    
    return (
        <html lang="en">
            <body>
                <div className='relative flex flex-col min-h-screen'>
                    <header className='w-full'>
                        <HeaderBar />
                    </header>
                    <main className='grow'>
                        {children}
                    </main>
                    <ModalMain />
                    <AlertMain />
                    <ToastMain />
                    {/* <Footer/> */}
                </div>
            </body>
        </html>
    )
}