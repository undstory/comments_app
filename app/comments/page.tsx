import { fetchComments, fetchReplies, fetchUser, fetchUsers } from '@/lib/data'
import Card from '../ui/comments/SingleComment'
import AddComment from '../ui/comments/AddComment'
import { Comment, User } from '@/lib/types'
import CommentsSection from '../ui/comments/CommentsSection'
import { auth, signOut } from '@/auth'
import { translations } from '@/constants/translations'
import { Box, Button, Container, FormControl, Typography } from '@mui/material'

export default async function Page() {
    const comments = await fetchComments()
    const replies = await fetchReplies()
    const users = await fetchUsers()
    const session = await auth()
    const loggedUserEmail = session && session?.user?.email
    const user = await fetchUser(loggedUserEmail as string)
    const { id: idLoggedUser, username: nameLoggedUser } = user || {}
    const { commentsApp, helloWord, signOutOption } = translations

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                bgcolor: 'hsl(223, 19%, 93%)',
                color: 'hsl(212, 24%, 26%)',
                p: 2,
                m: 0,
                minHeight: '100vh',
            }}
        >
            <Typography
                variant="body2"
                sx={{ color: '#fff', fontWeight: 700, textAlign: 'center' }}
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
                            'use server'
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
                                bgcolor: 'hsl(358, 79%, 66%)',
                                color: 'hsl(0, 0%, 100%)',
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
            {comments && comments.length ? (
                <AddComment idLoggedUser={idLoggedUser} />
            ) : null}
        </Container>
    )
}
