'use client'

import { translations } from '@/constants/translations'
import { Comment, Reply, User } from '@/lib/types'
import {
    Box,
    Button,
    Container,
    FormControl,
    Typography,
    useTheme,
} from '@mui/material'
import CommentsSection from './CommentsSection'
import AddComment from './AddComment'
import { signOut } from '@/auth'

type MainPageType = {
    idLoggedUser?: string
    nameLoggedUser?: string
    comments?: Comment[]
    replies?: Reply[]
    users?: User[]
}

export default function MainPage({
    comments,
    replies,
    users,
    idLoggedUser,
    nameLoggedUser,
}: MainPageType) {
    const { commentsApp, helloWord, signOutOption } = translations
    const theme = useTheme()
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                p: 2,
                m: 0,
                minHeight: '100vh',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.primary.light,
                    fontWeight: 700,
                    textAlign: 'center',
                }}
                component="h1"
            >
                {commentsApp}
            </Typography>
            <Box
                component="header"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: '700' }}
                    component="h2"
                >
                    {commentsApp.toUpperCase()}
                </Typography>
                <Box display="flex" alignItems="center" gap="20px">
                    <Typography variant="body1">
                        {' '}
                        {helloWord}
                        {nameLoggedUser}
                    </Typography>
                    <FormControl
                        action={async () => {
                            await signOut()
                        }}
                        component="form"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            sx={{
                                pl: 0.5,
                                bgcolor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.light,
                                fontWeight: '500',
                                width: 80,
                                p: 1,
                            }}
                        >
                            {signOutOption}
                        </Button>
                    </FormControl>
                </Box>
            </Box>

            <CommentsSection
                idLoggedUser={idLoggedUser}
                nameLoggedUser={nameLoggedUser}
                comments={comments}
                replies={replies}
                users={users}
            />
            <AddComment idLoggedUser={idLoggedUser} />
        </Container>
    )
}
