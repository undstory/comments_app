'use client'

import { translations } from '@/constants/translations'
import { Button } from '@mui/material'
import { useFormStatus } from 'react-dom'

export default function LogRegButton({
    variant,
}: {
    variant: 'login' | 'register'
}) {
    const { pending } = useFormStatus()
    const { loginWord, registerWord } = translations

    return (
        <Button
            variant="contained"
            size="small"
            sx={{
                pl: 0.5,
                bgcolor: 'hsl(358, 79%, 66%)',
                color: 'hsl(0, 0%, 100%)',
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
