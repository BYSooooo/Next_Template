import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline } from '@mui/material';
import StoreProvider from '../redux/StoreProvider';
import TopBar from '../menu/TopBar';
import ModeProvider from './provider';


export const metadata = {
    title : "Next Movie | Next Template"
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {


    return (
      <html lang="en">
        <body>
            <AppRouterCacheProvider>
                <StoreProvider>
                    <ModeProvider>
                      <TopBar />
                        {children}
                      <CssBaseline />
                    </ModeProvider>
                </StoreProvider>
            </AppRouterCacheProvider>
        </body>
      </html>
    )
  }