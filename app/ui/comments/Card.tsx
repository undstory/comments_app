import { fetchInfoAboutAuthor } from "@/lib/data";
import { Comment, Reply } from "@/lib/types";

export default async function Card({ comment, variant, reply}: {comment?: Comment, variant: 'comment' | 'reply', reply?: Reply }) {
    const { content, id, authorId } = comment || {};
    const { content: replyContent, id: replyId, parentId, authorId: replyAuthorId } = reply || {}
    const authorData = authorId && await fetchInfoAboutAuthor(authorId);
    const replyAuthorData = replyAuthorId && await fetchInfoAboutAuthor(replyAuthorId);

    return (
        <div style={{border: `1px solid red`, margin: `5px`, marginLeft: variant === "reply" ? `10px` : 0}}>
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