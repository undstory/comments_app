import { Reply } from "@/lib/types";
import AddReplyToReply from "./AddReplyToReply";
import Card from "./Card";
import { useState } from "react";

export default function SingleReply({id, reply, userData}: {id?: string, reply: Reply, userData: any}) {
    const [ replyToReplyForm, setReplyToReplyForm ] = useState<boolean>(false)
    const [ username ] = userData || [];
    return (
        <div>
            <Card variant="reply" username={username?.username} reply={reply} replyToReplyForm={replyToReplyForm} setReplyToReplyForm={setReplyToReplyForm} />
                { replyToReplyForm && reply ? (
                    <AddReplyToReply id={id} parentId={reply.parentId} username={username?.username} setReplyToReplyForm={setReplyToReplyForm} />
                ) : null }
        </div>
    );
}
