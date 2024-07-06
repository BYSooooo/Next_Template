import '@/shopping/theme/main.css'

import { Providers } from "./providers"
import ShoppingHeader from '@/shopping/component/header/ShoppingHeader'

export const metadata = {
    title : "Shopping | Next Template"
}

export default function RootLayout({
    children,
} : {
    children : React.ReactNode
}) {
    return (
        <html lang="en" >
            <body>
                <Providers >
                    <ShoppingHeader />
                    {children}
                </Providers>
            </body>
        </html>

    )
}