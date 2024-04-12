'use client'

import { fetchInfoAboutAuthor } from "@/lib/data";
import { Comment, Reply } from "@/lib/types";
import DeleteIt from "./DeleteIt";
import { boolean } from "zod";
import { useState } from "react";
import AddComment from "./AddComment";
import Card from "./Card";
import AddReply from "./AddReply";

export default function SingleComment({ comment, commentReplies}: {comment?: Comment, commentReplies?: Reply[]}) {

    // const { content: replyContent, id: replyId, parentId, authorId: replyAuthorId } = reply || {}
    // const authorData = authorId && await fetchInfoAboutAuthor(authorId);
    // const replyAuthorData = replyAuthorId && await fetchInfoAboutAuthor(replyAuthorId);
    const [ replyForm, setReplyForm ] = useState<boolean>(false)

    return (
        <div>
            <Card variant="comment" comment={comment} replyForm={replyForm} setReplyForm={setReplyForm} />
            {replyForm && comment ? (
                <AddReply parentId={comment.id}/>
            ) : null}
            <div>
                {commentReplies && commentReplies.map((reply) => {
                    return (
                        <div key={reply.id} >
                        <Card variant="reply" reply={reply}  />


                        </div>
                    )
                })}
            </div>
        </div>
    );
}