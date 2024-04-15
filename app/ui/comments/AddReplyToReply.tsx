'use client';

import { createReply } from "@/lib/actions";
import { useRef } from "react";

export default function AddReplyToReply({id, setReplyToReplyForm, parentId, username}: {id?: string, setReplyToReplyForm: any, parentId: string, username: any}) {
const formRef = useRef<HTMLFormElement>(null)

    return (
        <div style={{ backgroundColor: 'lightyellow', marginLeft: '10px'}}>
            <form ref={formRef} action={async (formData: FormData) => {
                await createReply(parentId, formData, id);
                formRef?.current?.reset();
                setReplyToReplyForm(false)}
            }>
                <textarea name="content" defaultValue={`@${username}, `}></textarea>
                <button type="submit">Reply</button>
            </form>
        </div>
    );
}