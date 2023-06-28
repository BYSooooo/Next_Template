import Menu from "@/menu/layouts/Menu"
import { Providers } from "@/redux/provider"

export const metadata = {
  title : "Next Template with MUI",
  description : 'template view for mui'
}

//Sample : https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <div>
              <Menu />
            </div>
            {children}
          </Providers>
        </body>  
        
    </html>
  )
}
