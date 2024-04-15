import { fetchComments, fetchReplies, fetchUser, fetchUsers } from "@/lib/data";
import Card from "../ui/comments/SingleComment";
import AddComment from "../ui/comments/AddComment";
import { Comment, User } from "@/lib/types";
import CommentsSection from "../ui/comments/CommentsSection";
import { auth, signOut } from "@/auth";


export default async function Page() {
    const comments = await fetchComments();
    const replies = await fetchReplies();
    const users = await fetchUsers();
    const session = await auth()
    const loggedUserEmail = session && session?.user?.email;
    const user = await fetchUser(loggedUserEmail as string)
    const { id, username, email } = user || {};
    return (
        <div>
            <h2>Comments App</h2>
            <h3>Hi, {username}</h3>
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

            <CommentsSection id={id} username={username} comments={comments} replies={replies} users={users} />

            <AddComment id={id}/>
        </div>
    );
}