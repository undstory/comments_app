import { fetchComments, fetchReplies } from "@/lib/data";
import Card from "../ui/comments/Card";

export default async function Page() {
    const comments = await fetchComments()
    const replies = await fetchReplies()
    console.log("comments", comments);
    console.log("replies", replies);

    return (
        <div>
            Comments qwqwqw
            {comments.length ? comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <Card variant="comment" comment={comment} />
                        {replies.map((reply) => {
                            if(reply.parentId === comment.id){
                                return (
                                    <div key="reply.id">
                                           <Card variant="reply" reply={reply} />
                                    </div>
                                )
                            } else {
                                null
                            }
                        })}
                    </div>
                )
            }) : (
                <div>Brak danych</div>
            )}
        </div>
    );
}