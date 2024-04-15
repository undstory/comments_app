'use client'

import { Reply, Comment, User } from "@/lib/types";

import SingleComment from "./SingleComment";

export default function CommentsSection({ id, username, comments, replies, users} : {id?: string, username?: string, comments?: Comment[],  replies?: Reply[], users?: any,}) {


    return (
        <div>
               {comments && comments.length > 0 ? comments?.map((comment: Comment) => {
                    const commentReplies: Reply[] | undefined = replies && replies.filter((reply) => reply.parentId === comment.id)
                    const userData: User[] | undefined = users && users.filter((user: any) => user.id === comment.authorId);
                return (
                        <SingleComment id={id} username={username} key={comment.id} users={users} userData={userData} commentReplies={commentReplies} comment={comment} />
                )
            }) : (
                <div>Brak danych</div>
            )}

        </div>
    );
}