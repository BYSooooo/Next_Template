import Menu from "@/layouts/Menu/Menu"

export const metadata = {
  title : "Next Template with MUI",
  description : 'template view for mui'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body>
        <div>
          <Menu />
        </div>
        {children}
      </body>
    </html>
  )
}
