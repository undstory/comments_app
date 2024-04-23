import { Reply, User } from '@/lib/types'
import AddReplyToReply from './AddReplyToReply'
import CardBox from './CardBox'
import { useState } from 'react'
import { Box } from '@mui/material'

type SingleReplyType = {
    idLoggedUser?: string
    users?: User[]
    reply: Reply
}

export default function SingleReply({
    idLoggedUser,
    users,
    reply,
}: SingleReplyType) {
    const [replyToReplyForm, setReplyToReplyForm] = useState<boolean>(false)
    const [authorOfId, setAuthorOfId] = useState<string>('')
    const nameOfAuthor: User[] | undefined =
        users && users.filter((user) => user.id === authorOfId)

    return (
        <Box sx={{ display: "flex", flexDirection: "column", mt: '10px', justifyContent: "flex-end", alignItems: "flex-end"}}>
            <CardBox
                variant="reply"
                authorOfId={authorOfId}
                setAuthorOfId={setAuthorOfId}
                users={users}
                idLoggedUser={idLoggedUser}
                reply={reply}
                replyToReplyForm={replyToReplyForm}
                setReplyToReplyForm={setReplyToReplyForm}
            />
            {replyToReplyForm && reply && nameOfAuthor ? (
                <AddReplyToReply
                    nameOfAuthor={nameOfAuthor}
                    idLoggedUser={idLoggedUser}
                    parentId={reply.parentId}
                    setReplyToReplyForm={setReplyToReplyForm}
                />
            ) : null}
        </Box>
    )
}
