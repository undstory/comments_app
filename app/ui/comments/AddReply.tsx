'use client'

import { translations } from '@/constants/translations'
import { createReply } from '@/lib/actions'
import { User } from '@/lib/types'
import {
    Avatar,
    Box,
    Button,
    Card,
    FormControl,
    TextField,
    useTheme,
} from '@mui/material'
import { SetStateAction, useRef } from 'react'

type AddReplyType = {
    idLoggedUser?: string
    parentId: string
    setReplyForm: (value: boolean) => void
    nameOfAuthor: User[]
}

export default function AddReply({
    idLoggedUser,
    parentId,
    setReplyForm,
    nameOfAuthor,
}: AddReplyType) {
    const formRef = useRef<HTMLFormElement>(null)
    const { addReply } = translations
    const theme = useTheme()

    return (
        <Card
            sx={{
                display: 'flex',
                width: '620px',
                py: 3,
                px: 2,
                mt: '10px',
                alignItems: 'flex-start',
            }}
        >
            <Avatar sx={{ width: 36, height: 36 }} alt="image of author" />
            <Box sx={{ alignItems: 'flex-start' }}>
                <FormControl
                    ref={formRef}
                    action={async (formData: FormData) => {
                        await createReply(parentId, formData, idLoggedUser)
                        formRef?.current?.reset()
                        setReplyForm(false)
                    }}
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '532px',
                        mx: '12px',
                    }}
                >
                    <TextField
                        multiline
                        id="outlined-multiline-static"
                        label={addReply}
                        rows={2}
                        sx={{ width: '100%' }}
                        name="content"
                        defaultValue={`@${nameOfAuthor[0].username}, `}
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
                            ml: '12px',
                            alignSelf: 'flex-start',
                        }}
                    >
                        {addReply}
                    </Button>
                </FormControl>
            </Box>
        </Card>
    )
}
