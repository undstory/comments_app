import { Comment, Reply, User } from "@/lib/types";
import { useState } from "react";
import DeleteIt from "./DeleteIt";

type CardType = {
    variant: 'comment' | 'reply',
    comment?: Comment,
    reply?: Reply,
    replyForm?: boolean,
    setReplyForm?: any,
    replyToReplyForm?: boolean,
    setReplyToReplyForm?: any,
    idLoggedUser?: string,
    users?: User[],
    setAuthorOfId?: any,
    authorOfId?: any
}

export default function Card({idLoggedUser, authorOfId, setAuthorOfId, users, variant, comment, reply, replyForm, setReplyForm, replyToReplyForm, setReplyToReplyForm}: CardType
) {
    const { content, id, authorId } = comment || {};

    const { content: replyContent, id: replyId, authorId: replyAuthorId } = reply || {};

    const handleReplyForm = (variant: 'comment' | 'reply') => {
        if(variant === 'comment') {
            setReplyForm(() => !replyForm)
            setAuthorOfId(authorId)
        } else {
            setReplyToReplyForm(() => !replyToReplyForm)
            setAuthorOfId(replyAuthorId)
        }
        }
    const authorOfComment = users && comment && users.filter((user) => user.id === comment.authorId);
    const authorOfReply = users && reply && users.filter((user) => user.id === replyAuthorId);


    return (
        <div style={{border: `1px solid red`, margin: `5px`, marginLeft: variant === "reply" ? `10px` : 0, backgroundColor: variant === "reply" ? `lightblue` : `lightpink`}}>
        <div style={{ display: `flex`, flexDirection: `row`, gap: `10px`, margin: `10px`}}>
            <button onClick={() => handleReplyForm(variant)}>Reply</button>
            {authorId === idLoggedUser && variant==="comment" && <DeleteIt variant={variant} id={id} replyId={replyId} />}
            {/* {replyAuthorId === userId && variant === "reply" ? (<DeleteIt variant={variant} id={id} replyId={replyId} />) : null} */}
            {variant === "comment" && (
                <div>Username: {authorOfComment && authorOfComment[0].username}</div>
            )}
            {variant === "reply" && (
                <div>Username: {authorOfReply && authorOfReply[0].username}</div>
            )}
        </div>
        <div>{content || replyContent }</div>
    </div>
    );
}
