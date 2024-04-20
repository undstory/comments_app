'use client'

import { Reply, Comment, User } from '@/lib/types'

import SingleComment from './SingleComment'
import { translations } from '@/constants/translations'
import { Box, Stack, Typography } from '@mui/material'

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
        <Stack direction="column" justifyContent="center"
        alignItems="center" spacing="10px" component="section" sx={{ py: 5, px: 2}}>
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
                <Box>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ textAlign: 'center', py: 10, px: 2 }}
                    >
                        {noData}
                    </Typography>
                </Box>
            )}
        </Stack>
    )
}
