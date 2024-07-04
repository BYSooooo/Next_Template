import '@/shopping/theme/main.css'

import { Providers } from "./providers"

export const metadata = {
    title : "Shopping | Next Template"
}

export default function RootLayout({
    children,
} : {
    children : React.ReactNode
}) {
    return (
        <html lang="en">
            <body className='mt-14'>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>

    )
}