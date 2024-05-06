'use client'

import {
    Box,
    Button,
    FormControl,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import plusIcon from '@/public/images/icon-plus.svg'
import { actualize } from '@/lib/actions'
import { User } from '@/lib/types'
import PlusIcon from '../svgicons/PlusIcon';
import MinusIcon from '../svgicons/MinusIcon';

export default function ScoreBox({
    scoreValue,
    id,
    idLoggedUser,
    authorOfComment,
    authorOfReply,
    variant,
}: {
    idLoggedUser?: string
    authorOfComment?: User[] | undefined
    authorOfReply?: User[] | undefined
    scoreValue?: number
    id?: string
    variant: 'comment' | 'reply'
}) {
    const theme = useTheme()
    const [plusHover, setPlusHover] = useState<boolean>(false)
    const [minusHover, setMinusHover] = useState<boolean>(false)
    const [score, setScore] = useState<number>(scoreValue || 0)
    const actualizeScore = id && actualize.bind(null, score, id, variant)
    const upScore = () => {
        if (score >= 0 && score < 100) setScore(score + 1)
    }

    const downScore = () => {
        if (score > 0) setScore(score - 1)
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                bgcolor: theme.palette.secondary.main,
                pt: 1,
                pb: 1.5,
                px: 1,
                height: '80px',
                width: '25px',
                borderRadius: '7px',
            }}
        >
            <FormControl component="form" action={actualizeScore}>
                <Button
                startIcon={<PlusIcon color={plusHover ? theme.palette.secondary.contrastText : theme.palette.info.main} />}
                    type="submit"
                    disabled={
                        (variant === 'comment' &&
                            authorOfComment &&
                            authorOfComment[0].id === idLoggedUser) ||
                        (variant === 'reply' &&
                            authorOfReply &&
                            authorOfReply[0].id === idLoggedUser)
                    }
                    sx={{ ':hover': { bgcolor: 'transparent' } }}
                    onClick={upScore}
                    onMouseEnter={() => setPlusHover(true)}
                                    onMouseLeave={() => setPlusHover(false)}
                >
                </Button>
            </FormControl>
            <Typography
                sx={{
                    fontSize: '14px',
                    color: theme.palette.secondary.contrastText,
                    fontWeight: '600',
                }}
            >
                {score}
            </Typography>
            <FormControl component="form" action={actualizeScore}>
                <Button
                startIcon={<MinusIcon color={ minusHover ? theme.palette.secondary.contrastText : theme.palette.info.main}/>}
                    sx={{':hover': { bgcolor: 'transparent' }, "&.Mui-disabled": {cursor: 'not-allowed'} }}
                    type="submit"
                    onClick={downScore}
                    disabled={
                        (variant === 'comment' &&
                            authorOfComment &&
                            authorOfComment[0].id === idLoggedUser) ||
                        (variant === 'reply' &&
                            authorOfReply &&
                            authorOfReply[0].id === idLoggedUser)
                    }
                    onMouseEnter={() => setMinusHover(true)}
                                    onMouseLeave={() => setMinusHover(false)}
                />
            </FormControl>
        </Box>
    )
}
