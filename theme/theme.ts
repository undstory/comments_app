'use client'
import { Rubik } from 'next/font/google'
import { Theme, createTheme } from '@mui/material/styles'

const rubik = Rubik({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
})

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: 'hsl(212, 24%, 26%)',
            light: 'hsl(0, 0%, 100%)',
            contrastText: 'hsl(358, 79%, 66%)',
        },
        secondary: {
            main: 'hsl(223, 19%, 93%)',
            dark: 'hsl(211, 10%, 45%)',
            light: 'hsl(228, 33%, 97%)',
            contrastText: 'hsl(238, 40%, 52%)',
        },
        info: {
            main: 'hsl(239, 57%, 85%)',
            contrastText: 'hsl(357, 100%, 86%)',
        },
    },
    typography: {
        fontFamily: rubik.style.fontFamily,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        pointerEvents: 'unset', // allow :hover styles to be triggered
                        cursor: 'not-allowed', // and custom cursor can be defined without :hover state
                    },
                },
                // styles applied when `startIcon` prop is set
                // startIcon: {
                //     // styles applied to the icon when disabled
                //     '.Mui-disabled &': {
                //         color: 'red',
                //     },
                //     color: 'yellow',
                // },
            },
        },
    },
})

export default theme
