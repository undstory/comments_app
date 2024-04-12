'use client'

import { fetchInfoAboutAuthor } from "@/lib/data";
import { Comment, Reply } from "@/lib/types";
import DeleteIt from "./DeleteIt";
import { boolean } from "zod";
import { useState } from "react";
import AddComment from "./AddComment";
import Card from "./Card";

export default function SingleComment({ comment, commentReplies}: {comment?: Comment, commentReplies?: Reply[]}) {

    // const { content: replyContent, id: replyId, parentId, authorId: replyAuthorId } = reply || {}
    // const authorData = authorId && await fetchInfoAboutAuthor(authorId);
    // const replyAuthorData = replyAuthorId && await fetchInfoAboutAuthor(replyAuthorId);

    return (
        <div>
            <Card variant="comment" comment={comment} />
            <div>
                {commentReplies && commentReplies.map((reply) => {
                    return (
                        <Card key={reply.id} variant="reply" reply={reply} />
                    )
                })}
            </div>
        </div>
    );
}