'use client'

import { translations } from '@/constants/translations'
import { deleteComment } from '@/lib/actions'
import { Button, FormControl, useTheme } from '@mui/material'
import DeleteIcon from '../svgicons/DeleteIcon'
import { useState } from 'react'

type DeleteItType = {
    id?: string
    replyId?: string
    variant: 'comment' | 'reply'
}

export default function DeleteIt({ id, replyId, variant }: DeleteItType) {
    const deleteThisShit = id && deleteComment.bind(null, id, variant)
    const deleteThisReply =
        replyId && deleteComment.bind(null, replyId, variant)
    const { yesDelete } = translations
    const theme = useTheme()
    const [hover, setHover] = useState(false)

    return (
        <FormControl
            component="form"
            sx={{ width: '100%' }}
            action={variant === 'comment' ? deleteThisShit : deleteThisReply}
        >
            <Button
                variant="contained"
                sx={{
                    textTransform: 'none',
                    color: theme.palette.primary.light,
                    width: '100%',
                    bgcolor: theme.palette.primary.contrastText,
                    ':hover': {
                        bgcolor: theme.palette.info.contrastText,
                    },
                }}
                type="submit"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {yesDelete.toUpperCase()}
            </Button>
        </FormControl>
    )
}
