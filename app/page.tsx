'use client'
import { translations } from '@/constants/translations'
import {
    Card,
    CardContent,
    Container,
    Typography,
    Button,
    CardActions,
    useTheme,
} from '@mui/material'
import NextLink from 'next/link'

export default function Home() {
    const { commentsApp, loginWord, registerWord } = translations
    const theme = useTheme()
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
                    maxWidth: 345,
                    m: 2,
                }}
            >
                <CardContent>
                    <Typography
                        component="h2"
                        variant="h5"
                        textAlign="center"
                        pb={2}
                        sx={{
                            fontWeight: '700',
                            color: theme.palette.primary.main,
                        }}
                    >
                        {commentsApp.toLowerCase()}
                    </Typography>

                    <CardActions
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            p: 0,
                        }}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            component={NextLink}
                            href="/login"
                            sx={{
                                pl: 0.5,
                                bgcolor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.light,
                                fontWeight: '500',
                                width: 100,
                                p: 1,
                                ':hover': {
                                    bgcolor: theme.palette.info.contrastText,
                                },
                            }}
                        >
                            {loginWord}
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            component={NextLink}
                            href="/register"
                            sx={{
                                pl: 0.5,
                                bgcolor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.light,
                                fontWeight: '500',
                                width: 100,
                                p: 1,
                                ':hover': {
                                    bgcolor: theme.palette.info.contrastText,
                                },
                            }}
                        >
                            {registerWord}
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Container>
    )
}
