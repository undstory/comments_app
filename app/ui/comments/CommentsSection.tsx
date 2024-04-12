'use client'

import { Reply, Comment } from "@/lib/types";

import { useState } from "react";
import SingleComment from "./SingleComment";

export default function CommentsSection({ comments, replies} : {comments?: Comment[], replies?: Reply[]}) {


    return (
        <div>
               {comments && comments.length > 0 ? comments?.map((comment: Comment) => {
                    const commentReplies: Reply[] | undefined = replies && replies.filter((reply) => reply.parentId === comment.id)
                return (
                        <SingleComment key={comment.id} commentReplies={commentReplies} comment={comment} />
                )
            }) : (
                <div>Brak danych</div>
            )}

        </div>
    );
}