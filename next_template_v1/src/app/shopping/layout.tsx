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
        <Providers >
            <ShoppingHeader />
            {children}
        </Providers>
    )
}