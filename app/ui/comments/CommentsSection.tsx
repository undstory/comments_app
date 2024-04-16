'use client'

import { Reply, Comment, User } from "@/lib/types";

import SingleComment from "./SingleComment";

export default function CommentsSection({ idLoggedUser, nameLoggedUser, comments, replies, users} : {idLoggedUser?: string, nameLoggedUser?: string, comments?: Comment[],  replies?: Reply[], users?: any,}) {


    return (
        <div>
               {comments && comments.length > 0 ? comments?.map((comment: Comment) => {
                    const commentReplies: Reply[] | undefined = replies && replies.filter((reply) => reply.parentId === comment.id) // odpowiedzi do danego komentarza
                    // const userData: User[] | undefined = users && users.filter((user: any) => user.id === comment.authorId);
                return (
                        <SingleComment idLoggedUser={idLoggedUser} nameLoggedUser={nameLoggedUser} key={comment.id} users={users} commentReplies={commentReplies} comment={comment} />
                )
            }) : (
                <div>Brak danych</div>
            )}

        </div>
    );
}