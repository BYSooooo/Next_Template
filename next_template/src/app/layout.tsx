import * as React from 'react';

import Menu from "@/menu/layouts/Menu"
import { Providers } from "@/redux/provider"
import ThemeRegistry from '@/theme/ThemeRegistry';
import {cookies} from 'next/headers'

export const metadata = {
  title : "Next Template with MUI",
  description : 'template view for mui'
}

export default function RootLayout({children}: { children: React.ReactNode}) {
  console.log(cookies())
  
  const onControlMode = () => {
    
  }

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Providers>
            <Menu/>          
            {children}
          </Providers>
        </ThemeRegistry>
      </body>  
    </html>
  )
}
