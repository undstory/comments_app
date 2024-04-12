import { fetchComments, fetchReplies } from "@/lib/data";
import Card from "../ui/comments/SingleComment";
import AddComment from "../ui/comments/AddComment";
import { Comment } from "@/lib/types";
import CommentsSection from "../ui/comments/CommentsSection";

export default async function Page() {
    const comments = await fetchComments();
    const replies = await fetchReplies()


    return (
        <div>
            <h2>Comments App</h2>
            <CommentsSection comments={comments} replies={replies} />

            <AddComment />
        </div>
    );
}