import { fetchComments, fetchReplies } from "@/lib/data";
import Card from "../ui/comments/Card";
import AddComment from "../ui/comments/AddComment";
import { Comment } from "@/lib/types";

export default async function Page() {
    const comments = await fetchComments();
    const replies = await fetchReplies()


    return (
        <div>
            Comments qwqwqw
            {comments && comments.length > 0 ? comments?.map((comment: Comment) => {
                return (
                    <div key={comment.id}>
                        <Card variant="comment" comment={comment} />
                        {replies && replies.length && replies.map((reply) => {
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
            <AddComment />
        </div>
    );
}