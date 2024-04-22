import { Typography } from '@mui/material'

export default function Score({ scoreValue }: { scoreValue?: number }) {
    return (
        <Typography
            sx={{
                fontSize: '14px',
                color: 'hsl(238, 40%, 52%)',
                fontWeight: '600',
            }}
        >
            {scoreValue ? scoreValue : 0}
        </Typography>
    )
}
