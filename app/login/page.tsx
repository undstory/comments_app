'use client'

import { authenticate } from '@/lib/actions'
import NextLink from 'next/link'
import { useFormState } from 'react-dom'
import LogRegButton from '../ui/login/LogRegButton'
import { translations } from '@/constants/translations'
import {
    Button,
    Card,
    Container,
    Typography,
    FormControl,
    TextField,
    Box,
    useTheme,
} from '@mui/material'

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)
    const { cancelWord, loginWord, commentsApp } = translations
    const theme = useTheme();
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                p: 0,
                m: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.light, fontWeight: 700 }}
                component="h1"
            >
                {commentsApp}
            </Typography>
            <Card
                sx={{
                    px: 3,
                    py: 2,
                    bgcolor: theme.palette.primary.light,
                    width: 345,
                    m: 2,
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    textAlign="center"
                    pb={2}
                >
                    {loginWord}
                </Typography>
                <FormControl
                    action={dispatch}
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        gap: '10px',
                        width: '100%',
                    }}
                >
                    <TextField
                        disabled={false}
                        name="email"
                        id="email"
                        type="email"
                        required
                        variant="outlined"
                        size="small"
                        placeholder="Enter your email address"
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        disabled={false}
                        name="password"
                        id="password"
                        type="password"
                        required
                        variant="outlined"
                        size="small"
                        placeholder="password"
                        sx={{ width: '100%' }}
                    />
                    {errorMessage && (
                        <>
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: '500',
                                }}
                            >
                                {errorMessage}
                            </Typography>
                        </>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            py: 1,
                            width: '100%',
                        }}
                    >
                        <Button
                            href="/"
                            variant="contained"
                            size="small"
                            sx={{
                                bgcolor: theme.palette.secondary.light,
                                color: theme.palette.primary.main,
                                fontWeight: '500',
                                width: 80,
                                p: 1,
                                ':hover': {
                                    color: theme.palette.secondary.main
                                }
                            }}
                            component={NextLink}
                        >
                            {cancelWord}
                        </Button>
                        <LogRegButton variant="login" />
                    </Box>
                </FormControl>
            </Card>
        </Container>
    )
}
