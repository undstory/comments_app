import { translations } from '@/constants/translations'
import {
    Card,
    CardContent,
    Container,
    Typography,
    Button,
    CardActions,
} from '@mui/material'
import NextLink from 'next/link'

export default function Home() {
    const { commentsApp, loginWord, registerWord } = translations
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                bgcolor: 'hsl(223, 19%, 93%)',
                color: 'hsl(212, 24%, 26%)',
                p: 0,
                m: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                sx={{
                    px: 3,
                    py: 2,
                    bgcolor: 'hsl(0, 0%, 100%)',
                    maxWidth: 345,
                    m: 2,
                }}
            >
                <CardContent>
                    <Typography
                        component="h2"
                        variant="h3"
                        textAlign="center"
                        pb={2}
                    >
                        {commentsApp}
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
                                bgcolor: 'hsl(358, 79%, 66%)',
                                color: 'hsl(0, 0%, 100%)',
                                fontWeight: '500',
                                width: 100,
                                p: 1,
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
                                bgcolor: 'hsl(358, 79%, 66%)',
                                color: 'hsl(0, 0%, 100%)',
                                fontWeight: '500',
                                width: 100,
                                p: 1,
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
