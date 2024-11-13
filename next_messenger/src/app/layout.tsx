import './globals.css'
import type { Metadata } from "next"
import Header from "../main/Header"
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title : "Next Messenger | Next Template"
}

export default function RootLayout({children} : {children: React.ReactNode}) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="data-mode">
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  }