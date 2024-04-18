'use client'

import { Reply, Comment, User } from '@/lib/types'

import SingleComment from './SingleComment'
import { translations } from '@/constants/translations'

export default function CommentsSection({
    idLoggedUser,
    nameLoggedUser,
    comments,
    replies,
    users,
}: {
    idLoggedUser?: string
    nameLoggedUser?: string
    comments?: Comment[]
    replies?: Reply[]
    users?: any
}) {
    const { noData } = translations

    return (
        <div>
            {comments && comments.length > 0 ? (
                comments?.map((comment: Comment) => {
                    const commentReplies: Reply[] | undefined =
                        replies &&
                        replies.filter((reply) => reply.parentId === comment.id)
                    return (
                        <SingleComment
                            idLoggedUser={idLoggedUser}
                            nameLoggedUser={nameLoggedUser}
                            key={comment.id}
                            users={users}
                            commentReplies={commentReplies}
                            comment={comment}
                        />
                    )
                })
            ) : (
                <div>{noData}</div>
            )}
        </div>
    )
}
