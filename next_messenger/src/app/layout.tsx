import './globals.css'
import type { Metadata } from "next"
import Header from "../main/Header"

export const metadata: Metadata = {
  title : "Next Messenger | Next Template"
}

export default function RootLayout({children} : {children: React.ReactNode}) {
    return (
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    )
  }