'use client'
import { Typography, useTheme } from '@mui/material'

export default function Score({ scoreValue }: { scoreValue?: number }) {
    const theme = useTheme();
    return (
        <Typography
            sx={{
                fontSize: '14px',
                color: theme.palette.secondary.contrastText,
                fontWeight: '600',
            }}
        >
            {scoreValue ? scoreValue : 0}
        </Typography>
    )
}
