import * as React from 'react';

import Menu from "@/menu/layouts/Menu"
import { Providers } from "@/redux/provider"
import ThemeRegistry from '@/theme/ThemeRegistry';

export const metadata = {
  title : "Next Template",
  description : ''
}


export default function RootLayout({children}: { children: React.ReactNode}) {
  
  return (
    <html lang="en">
      <body>
          <Providers>
            <ThemeRegistry>
              <Menu />          
              {children}
            </ThemeRegistry>
          </Providers>
      </body>  
    </html>
  )
}
