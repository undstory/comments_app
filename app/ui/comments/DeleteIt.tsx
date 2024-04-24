'use client'

import { translations } from '@/constants/translations'
import { deleteComment } from '@/lib/actions'
import { Button, useTheme } from '@mui/material'
import { useState } from 'react'
import DeleteIcon from '../svgicons/DeleteIcon';

type DeleteItType = {
    id?: string
    replyId?: string
    variant: 'comment' | 'reply'
}



export default function DeleteIt({ id, replyId, variant }: DeleteItType) {
    const deleteThisShit = id && deleteComment.bind(null, id, variant)
    const deleteThisReply =
        replyId && deleteComment.bind(null, replyId, variant)
    const { deleteIt } = translations
    const theme = useTheme()
    const [ hover, setHover] = useState(false)


    return (
        <form action={variant === 'comment' ? deleteThisShit : deleteThisReply}>
            <Button
                variant="text"
                startIcon={<DeleteIcon color={hover ? 'hsl(357, 100%, 86%)' : 'hsl(358, 79%, 66%)'}/>}
                sx={{
                    textTransform: 'none',
                    color: theme.palette.primary.contrastText,
                    fontSize: '600',
                    ':hover': {
                        bgcolor: 'transparent',
                        color: theme.palette.info.contrastText
                    }
                }}
                type="submit"
                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
            >
                {deleteIt}
            </Button>
        </form>
    )
}
