import * as React from 'react';

import Menu from "@/menu/layouts/Menu"
import { Providers } from "@/redux/provider"
import ThemeRegistry from '@/theme/ThemeRegistry';

export const metadata = {
  title : "Next Template with MUI",
  description : 'template view for mui'
}

export default function RootLayout({children}: { children: React.ReactNode}) {
  
  const onControlTheme = (use : boolean) => {
    console.log(use)
  }

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Providers>
            <Menu theme={onControlTheme}/>          
            {children}
          </Providers>
        </ThemeRegistry>
      </body>  
    </html>
  )
}
