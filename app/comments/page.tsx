import { fetchComments, fetchReplies, fetchUser, fetchUsers } from '@/lib/data'
import Card from '../ui/comments/SingleComment'
import AddComment from '../ui/comments/AddComment'
import { Comment, User } from '@/lib/types'
import CommentsSection from '../ui/comments/CommentsSection'
import { auth, signOut } from '@/auth'
import { translations } from '@/constants/translations'
import { Box, Button, Container, FormControl, Typography } from '@mui/material'
import MainPage from '../ui/comments/MainPage'

export default async function Page() {
    const comments = await fetchComments()
    const replies = await fetchReplies()
    const users = await fetchUsers()
    const session = await auth()
    const loggedUserEmail = session && session?.user?.email
    const user = await fetchUser(loggedUserEmail as string)
    const { id: idLoggedUser, username: nameLoggedUser } = user || {}

    return (
        <MainPage
            comments={comments}
            replies={replies}
            users={users}
            idLoggedUser={idLoggedUser}
            nameLoggedUser={nameLoggedUser}
        />
    )
}
