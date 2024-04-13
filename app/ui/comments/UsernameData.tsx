
import { fetchInfoAboutAuthor } from "@/lib/data";

export default async function UsernameData ({authorId}: {authorId?: string}) {
    const authorData = authorId && await fetchInfoAboutAuthor(authorId);
    return (
        <div>
            {authorData && authorData.username}
        </div>
    );
}