import { fetchInfoAboutAuthor } from "@/lib/data";
import { Comment, Reply } from "@/lib/types";
import DeleteIt from "./DeleteIt";

export default async function Card({ comment, variant, reply}: {comment?: Comment, variant: 'comment' | 'reply', reply?: Reply }) {
    const { content, id, authorId } = comment || {};
    const { content: replyContent, id: replyId, parentId, authorId: replyAuthorId } = reply || {}
    const authorData = authorId && await fetchInfoAboutAuthor(authorId);
    const replyAuthorData = replyAuthorId && await fetchInfoAboutAuthor(replyAuthorId);



    return (
        <div style={{border: `1px solid red`, margin: `5px`, marginLeft: variant === "reply" ? `10px` : 0, backgroundColor: variant === "reply" ? `lightblue` : `lightpink`}}>
            <div style={{ display: `flex`, flexDirection: `row`, gap: `10px`, margin: `10px`}}>
                <button>Reply</button>
                <DeleteIt variant={variant} id={id} replyId={replyId} />
            </div>
            <div>{content || replyContent}</div>
            {
            variant === "comment" ? (
            <div>Username: {authorData && authorData?.username} </div>
             ) : (
                <div>Username: {replyAuthorData && replyAuthorData?.username} </div>
             )
        }
        </div>
    );
}