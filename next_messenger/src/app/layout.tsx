import './globals.css'
import type { Metadata } from "next"
import Header from "../main/Header"
import { ThemeProvider } from 'next-themes'
import StoreProvider from './StoreProvider'

export const metadata: Metadata = {
  title : "Next Messenger | Next Template"
}

export default function RootLayout({children} : {children: React.ReactNode}) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <StoreProvider>
            <ThemeProvider 
              attribute="class"
              defaultTheme='system'
              enableSystem>
              <Header />
              {children}
            </ThemeProvider>
          </StoreProvider>
        </body>
      </html>
    )
  }