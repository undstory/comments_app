'use client'

import { fetchInfoAboutAuthor } from '@/lib/data'
import { Comment, Reply, User } from '@/lib/types'
import DeleteIt from './DeleteIt'
import { boolean } from 'zod'
import { useEffect, useState } from 'react'
import AddComment from './AddComment'
import Card from './Card'
import AddReply from './AddReply'
import AddReplyToReply from './AddReplyToReply'
import SingleReply from './SingleReply'

type SingleCommentType = {
    idLoggedUser?: string
    nameLoggedUser?: string
    comment?: Comment
    commentReplies?: Reply[]
    users: User[]
}

export default function SingleComment({
    idLoggedUser,
    nameLoggedUser,
    comment,
    commentReplies,
    users,
}: SingleCommentType) {
    const [replyForm, setReplyForm] = useState<boolean>(false)
    const [authorOfId, setAuthorOfId] = useState<string>('')
    const nameOfAuthor = users && users.filter((user) => user.id === authorOfId)

    return (
        <div>
            <Card
                variant="comment"
                authorOfId={authorOfId}
                setAuthorOfId={setAuthorOfId}
                users={users}
                idLoggedUser={idLoggedUser}
                comment={comment}
                replyForm={replyForm}
                setReplyForm={setReplyForm}
            />
            {replyForm && comment ? (
                <AddReply
                    idLoggedUser={idLoggedUser}
                    nameOfAuthor={nameOfAuthor}
                    parentId={comment.id}
                    setReplyForm={setReplyForm}
                />
            ) : null}
            <div>
                {commentReplies && commentReplies.length > 0
                    ? commentReplies.map((reply: Reply) => {
                          return (
                              <SingleReply
                                  idLoggedUser={idLoggedUser}
                                  users={users}
                                  key={reply.id}
                                  reply={reply}
                              />
                          )
                      })
                    : null}
            </div>
        </div>
    )
}
