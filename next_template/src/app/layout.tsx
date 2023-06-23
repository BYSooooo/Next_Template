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
      <body>{children}</body>
    </html>
  )
}
