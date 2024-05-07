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
    useTheme,
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
                width: {
                    md: '620px',
                    xs: '350px',
                },
                py: 3,
                px: 2,
                alignItems: 'flex-start',
                m: '0 auto 90px',
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
                        await createComment(formData, idLoggedUser)
                        formRef?.current?.reset()
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
                        label={addComment}
                        rows={2}
                        sx={{ width: '100%' }}
                        name="content"
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
                                    backgroundColor: theme.palette.info.main,
                                },
                            }}
                        >
                            {send}
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </Card>
    )
}
