import { Reply, User } from '@/lib/types'
import AddReplyToReply from './AddReplyToReply'
import Card from './Card'
import { useState } from 'react'

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
    const nameOfAuthor = users && users.filter((user) => user.id === authorOfId)

    return (
        <div>
            <Card
                variant="reply"
                authorOfId={authorOfId}
                setAuthorOfId={setAuthorOfId}
                users={users}
                idLoggedUser={idLoggedUser}
                reply={reply}
                replyToReplyForm={replyToReplyForm}
                setReplyToReplyForm={setReplyToReplyForm}
            />
            {replyToReplyForm && reply ? (
                <AddReplyToReply
                    nameOfAuthor={nameOfAuthor}
                    idLoggedUser={idLoggedUser}
                    parentId={reply.parentId}
                    setReplyToReplyForm={setReplyToReplyForm}
                />
            ) : null}
        </div>
    )
}
