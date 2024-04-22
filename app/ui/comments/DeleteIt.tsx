'use client'

import { translations } from '@/constants/translations'
import { deleteComment } from '@/lib/actions'
import { Button, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import Image from 'next/image'

type DeleteItType = {
    id?: string
    replyId?: string
    variant: 'comment' | 'reply'
}

const DeleteIcon = () => {
    return (
        <Image
            src="/images/icon-delete.svg"
            width={10}
            height={10}
            alt="remove icon"
        />
    )
}

export default function DeleteIt({ id, replyId, variant }: DeleteItType) {
    const deleteThisShit = id && deleteComment.bind(null, id, variant)
    const deleteThisReply =
        replyId && deleteComment.bind(null, replyId, variant)
    const { deleteIt } = translations
    const theme = useTheme()

    return (
        <form action={variant === 'comment' ? deleteThisShit : deleteThisReply}>
            <Button
                variant="text"
                startIcon={<DeleteIcon />}
                sx={{
                    textTransform: 'none',
                    color: theme.palette.primary.contrastText,
                    fontSize: '600',
                }}
                type="submit"
            >
                {deleteIt}
            </Button>
        </form>
    )
}
