'use client'

import { translations } from '@/constants/translations'
import { createComment } from '@/lib/actions'
import { FormControl, Box, Button } from '@mui/material'
import { useRef } from 'react'

export default function AddComment({
    idLoggedUser,
}: {
    idLoggedUser?: string
}) {
    const formRef = useRef<HTMLFormElement>(null)
    const { addComment } = translations

    return (
        <Box>
            <FormControl
                ref={formRef}
                action={async (formData: FormData) => {
                    await createComment(formData, idLoggedUser)
                    formRef?.current?.reset()
                }}
                component="form"
                sx={{ display: "flex", gap: "10px", flexDirection:"row", justifyContent: "center", alignItems: "center"}}
            >
                <textarea name="content"></textarea>
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        pl: 0.5,
                        bgcolor: 'hsl(358, 79%, 66%)',
                        color: 'hsl(0, 0%, 100%)',
                        fontWeight: '500',
                        p: 1,
                    }}
                >
                    {addComment}
                </Button>
            </FormControl>
        </Box>
    )
}
