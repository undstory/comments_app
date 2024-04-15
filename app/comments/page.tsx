import { fetchComments, fetchReplies, fetchUsers } from "@/lib/data";
import Card from "../ui/comments/SingleComment";
import AddComment from "../ui/comments/AddComment";
import { Comment, User } from "@/lib/types";
import CommentsSection from "../ui/comments/CommentsSection";
import { signOut } from "@/auth";


export default async function Page() {
    const comments = await fetchComments();
    const replies = await fetchReplies();
    const users = await fetchUsers();

    return (
        <div>
            <h2>Comments App</h2>
            <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button>
            <div>Sign Out</div>
          </button>
        </form>
            <CommentsSection comments={comments} replies={replies} users={users} />

            <AddComment />
        </div>
    );
}