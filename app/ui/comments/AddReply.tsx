'use client';

import { createReply } from "@/lib/actions";
import { useRef } from "react";

export default function AddReply({id, parentId, setReplyForm, username }: {id?: string, parentId: string, setReplyForm: any, username: string}) {
const formRef = useRef<HTMLFormElement>(null)

    return (
        <div>
            <form ref={formRef} action={async (formData: FormData) => {
                await createReply(parentId, formData, id);
                formRef?.current?.reset();
                setReplyForm(false)
            }
            }>
                <textarea name="content" defaultValue={`@${username}, `}></textarea>
                <button type="submit">Add reply</button>
            </form>
        </div>
    );
}