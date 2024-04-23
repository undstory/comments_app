'use client'

import { translations } from '@/constants/translations'
import { Button, useTheme } from '@mui/material'
import { useFormStatus } from 'react-dom'

export default function LogRegButton({
    variant,
}: {
    variant: 'login' | 'register'
}) {
    const { pending } = useFormStatus()
    const { loginWord, registerWord } = translations
    const theme = useTheme();

    return (
        <Button
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
            type="submit"
        >
            {variant === 'login' ? loginWord : registerWord}
            {pending ? '...' : ''}
        </Button>
    )
}
