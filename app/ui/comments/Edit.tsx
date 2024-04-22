'use client'

import { translations } from '@/constants/translations'
import { updateContent } from '@/lib/actions'
import {
    FormControl,
    TextField,
    ButtonGroup,
    Button,
    useTheme,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

type EditType = {
    setEditState: (value: boolean) => void
    id?: string
    replyId?: string
    variant: string
    content?: string
    replyContent?: string
}

export default function Edit({
    content,
    replyContent,
    id,
    replyId,
    setEditState,
    variant,
}: EditType) {
    const { update } = translations
    const idEditedThing = id || replyId
    const theme = useTheme()
    return (
        <FormControl
            component="form"
            action={async (formData: FormData) => {
                await updateContent(variant, formData, idEditedThing)
                setEditState(false)
            }}
            sx={{ width: '100%' }}
        >
            <TextField
                multiline
                id="outlined-multiline-static"
                rows={2}
                sx={{ width: '100%', mb: 2 }}
                name="newContent"
                defaultValue={content || replyContent}
            />
            <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{
                    pl: 0.5,
                    bgcolor: theme.palette.secondary.contrastText,
                    color: theme.palette.primary.light,
                    fontWeight: '500',
                    p: 1,
                    alignSelf: 'flex-end',
                }}
            >
                {update}
            </Button>
        </FormControl>
    )
}
