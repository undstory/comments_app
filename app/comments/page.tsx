import { fetchComments, fetchReplies, fetchUser, fetchUsers } from '@/lib/data'
import Card from '../ui/comments/SingleComment'
import AddComment from '../ui/comments/AddComment'
import { Comment, User } from '@/lib/types'
import CommentsSection from '../ui/comments/CommentsSection'
import { auth, signOut } from '@/auth'
import { translations } from '@/constants/translations'

export default async function Page() {
    const comments = await fetchComments()
    const replies = await fetchReplies()
    const users = await fetchUsers()
    const session = await auth()
    const loggedUserEmail = session && session?.user?.email
    const user = await fetchUser(loggedUserEmail as string)
    const { id: idLoggedUser, username: nameLoggedUser } = user || {}
    const { commentsApp, helloWord, signOutOption } = translations
    console.log(users)

    return (
        <div>
            <h2>{commentsApp}</h2>
            <h3>
                {helloWord}
                {nameLoggedUser}
            </h3>
            <form
                action={async () => {
                    'use server'
                    await signOut()
                }}
            >
                <button type="submit">
                    <div>{signOutOption}</div>
                </button>
            </form>
            <CommentsSection
                idLoggedUser={idLoggedUser}
                nameLoggedUser={nameLoggedUser}
                comments={comments}
                replies={replies}
                users={users}
            />
            <AddComment idLoggedUser={idLoggedUser} />
        </div>
    )
}
