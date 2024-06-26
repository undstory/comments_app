import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme/theme'
import { CssBaseline } from '@mui/material'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Comments App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body style={{ margin: 0, padding: 0 }} className={rubik.className}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Providers>{children}</Providers>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
