import { Comment, Reply } from "@/lib/types";
import { useState } from "react";

export default function Card({variant, comment, reply}: {variant: 'comment' | 'reply', comment?: Comment, reply?: Reply}) {
    const { content, id, authorId } = comment || {};
    const { content: replyContent, id: replyId, authorId: replyAuthorId } = reply || {};
    const [ replyForm, setReplyForm ] = useState<boolean>(true)
    return (
        <div style={{border: `1px solid red`, margin: `5px`, marginLeft: variant === "reply" ? `10px` : 0, backgroundColor: variant === "reply" ? `lightblue` : `lightpink`}}>
        <div style={{ display: `flex`, flexDirection: `row`, gap: `10px`, margin: `10px`}}>
            <button onClick={() => setReplyForm(!replyForm)}>Reply</button>
            {/* <DeleteIt variant={variant} id={id} replyId={replyId} /> */}
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