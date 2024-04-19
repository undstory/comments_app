'use client'

import { Reply, Comment, User } from '@/lib/types'

import SingleComment from './SingleComment'
import { translations } from '@/constants/translations'

type CommentsSectionType = {
    idLoggedUser?: string
    nameLoggedUser?: string
    comments?: Comment[]
    replies?: Reply[]
    users?: User[]
}

export default function CommentsSection({
    idLoggedUser,
    nameLoggedUser,
    comments,
    replies,
    users,
}: CommentsSectionType) {
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
