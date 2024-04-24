'use client'

import { translations } from '@/constants/translations'
import { createComment } from '@/lib/actions'
import {
    FormControl,
    Box,
    Button,
    Input,
    TextField,
    Card,
    Avatar,
    useTheme
} from '@mui/material'
import { useRef } from 'react'

export default function AddComment({
    idLoggedUser,
}: {
    idLoggedUser?: string
}) {
    const formRef = useRef<HTMLFormElement>(null)
    const { addComment, send } = translations
    const theme = useTheme()

    return (
        <Card
            sx={{
                display: 'flex',
                width: '620px',
                py: 3,
                px: 2,
                alignItems: 'flex-start',
                m: '0 auto 90px',
            }}
        >
            <Avatar sx={{ width: 36, height: 36 }} alt="image of author" />
            <Box sx={{ alignItems: 'flex-start' }}>
                <FormControl
                    ref={formRef}
                    action={async (formData: FormData) => {
                        await createComment(formData, idLoggedUser)
                        formRef?.current?.reset()
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
                        label={addComment}
                        rows={2}
                        sx={{ width: '100%' }}
                        name="content"
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
                            ':hover': {
                                backgroundColor: theme.palette.info.main,
                              },
                        }}
                    >
                        {send}
                    </Button>
                </FormControl>
            </Box>
        </Card>
    )
}
