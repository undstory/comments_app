import { Reply } from "@/lib/types";
import AddReplyToReply from "./AddReplyToReply";
import Card from "./Card";
import { useState } from "react";

export default function SingleReply({reply}: {reply: Reply}) {
    const [ replyToReplyForm, setReplyToReplyForm ] = useState<boolean>(false)

    return (
        <div>
            <Card variant="reply" reply={reply} replyToReplyForm={replyToReplyForm} setReplyToReplyForm={setReplyToReplyForm} />
                { replyToReplyForm && reply ? (
                    <AddReplyToReply parentId={reply.parentId} setReplyToReplyForm={setReplyToReplyForm} />
                ) : null }
        </div>
    );
}
