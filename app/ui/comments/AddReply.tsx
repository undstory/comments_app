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
                width: {
                    md: '620px',
                    xs: '350px',
                },
                py: 3,
                px: 2,
                mt: '10px',
                alignItems: 'flex-start',
            }}
        >
            <Avatar
                sx={{
                    width: 36,
                    height: 36,
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
                alt="image of author"
            />
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
                        flexDirection: {
                            md: 'row',
                            xs: 'column',
                        },
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: {
                            md: '910px',
                            xs: '300px',
                        },
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
                    <Box
                        sx={{
                            display: {
                                xs: 'flex',
                            },
                            justifyContent: {
                                xs: 'space-between',
                            },
                            alignItems: {
                                xs: 'center',
                            },
                            width: {
                                xs: 'inherit',
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                display: {
                                    xs: 'flex',
                                    md: 'none',
                                },
                                marginTop: {
                                    xs: '10px',
                                },
                            }}
                            alt="image of author"
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
                                mt: {
                                    md: '0px',
                                    xs: '10px',
                                },
                                alignSelf: {
                                    md: 'flex-start',
                                    xs: 'flex-end',
                                },
                                ':hover': {
                                    bgcolor: theme.palette.info.main,
                                },
                            }}
                        >
                            {addReply}
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </Card>
    )
}
