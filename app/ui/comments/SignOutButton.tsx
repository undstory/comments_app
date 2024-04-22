'use client'

import { translations } from '@/constants/translations'
import { Button, useTheme } from '@mui/material'

export default function SignOutButton() {
    const { signOutOption } = translations
    const theme = useTheme()
    return (
        <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{
                pl: 0.5,
                bgcolor: theme.palette.primary.contrastText,
                color: theme.palette.primary.light,
                fontWeight: '500',
                width: 80,
                p: 1,
            }}
        >
            {signOutOption}
        </Button>
    )
}
