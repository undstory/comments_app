import { Comment, Reply } from "@/lib/types";
import { useState } from "react";
import DeleteIt from "./DeleteIt";

type CardType = {
    variant: 'comment' | 'reply',
    comment?: Comment,
    reply?: Reply,
    replyForm?: boolean,
    setReplyForm?: any,
    replyToReplyForm?: boolean,
    setReplyToReplyForm?: any
}

export default function Card({variant, comment, reply, replyForm, setReplyForm, replyToReplyForm, setReplyToReplyForm}: CardType
) {
    const { content, id, authorId } = comment || {};
    const { content: replyContent, id: replyId, authorId: replyAuthorId } = reply || {};

    const handleReplyForm = (variant: 'comment' | 'reply') => {
        if(variant === 'comment') {
            setReplyForm(() => !replyForm)
        } else {
            setReplyToReplyForm(() => !replyToReplyForm)
        }
        }

    return (
        <div style={{border: `1px solid red`, margin: `5px`, marginLeft: variant === "reply" ? `10px` : 0, backgroundColor: variant === "reply" ? `lightblue` : `lightpink`}}>
        <div style={{ display: `flex`, flexDirection: `row`, gap: `10px`, margin: `10px`}}>
            <button onClick={() => handleReplyForm(variant)}>Reply</button>
            <DeleteIt variant={variant} id={id} replyId={replyId} />
        </div>
        <div>{content || replyContent }</div>
        {/* {
        variant === "comment" ? (
        <div>Username: {authorData && authorData?.username} </div>
         ) : (
            <div>Username: {replyAuthorData && replyAuthorData?.username} </div>
         )
    } */}
    </div>
    );
}

function useEffect(arg0: () => void, arg1: (string | undefined)[]) {
    throw new Error("Function not implemented.");
}
