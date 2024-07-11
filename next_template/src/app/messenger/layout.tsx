 // These styles apply to every route in the application
import '@/messenger/styles/globals.css'

export const metadata = {
  title : "Messenger | Next Template"
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return children
}