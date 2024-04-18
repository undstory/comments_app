import { updateContent } from "@/lib/actions";

export default function Edit({content, replyContent, id, replyId, setEditState, variant} : {setEditState?: any, id?: string, replyId?: string, variant: string, content?: string, replyContent?: string}) {


        // const editComment = id && updateContent.bind(null, id, variant)
        // const editReply = replyId && updateContent.bind(null, replyId, variant)
    const idEditedThing = id || replyId;
    return (
        // <form action={variant === "comment" ? editComment : editReply}>
        <form action={async (formData: FormData) => {
            await updateContent(variant, formData, idEditedThing);
            setEditState(false)
        }
        }>
            <textarea name="newContent" defaultValue={content || replyContent }/>
            <button type="submit">Edit</button>
        </form>
    );
}

