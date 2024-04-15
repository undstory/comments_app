'use client'

import { fetchInfoAboutAuthor } from "@/lib/data";
import { Comment, Reply, User } from "@/lib/types";
import DeleteIt from "./DeleteIt";
import { boolean } from "zod";
import { useState } from "react";
import AddComment from "./AddComment";
import Card from "./Card";
import AddReply from "./AddReply";
import AddReplyToReply from "./AddReplyToReply";
import SingleReply from "./SingleReply";

export default function SingleComment({ comment, userData, commentReplies, users}: {comment?: Comment, userData?: User[], commentReplies?: Reply[], users: User[]}) {
    const [ username ] = userData || [];
    // const { content: replyContent, id: replyId, parentId, authorId: replyAuthorId } = reply || {}
    // const authorData = authorId && await fetchInfoAboutAuthor(authorId);
    // const replyAuthorData = replyAuthorId && await fetchInfoAboutAuthor(replyAuthorId);
    const [ replyForm, setReplyForm ] = useState<boolean>(false)
    return (
        <div>
            <Card variant="comment" username={username?.username} comment={comment} replyForm={replyForm} setReplyForm={setReplyForm} />
            {replyForm && comment ? (
                <AddReply parentId={comment.id} username={username?.username}  setReplyForm={setReplyForm}/>
            ) : null}
            <div>
                {commentReplies && commentReplies.length > 0 ? commentReplies.map((reply: Reply) => {
                    const userData: User[] | undefined = users && users.filter((user: any) => user.id === reply.authorId);

                    return (
                        <SingleReply userData={userData} key={reply.id} reply={reply} />
                    )
                }): null}
            </div>
        </div>
    );
}