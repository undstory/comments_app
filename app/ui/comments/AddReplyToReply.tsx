'use client';

import { createReply } from "@/lib/actions";
import { useRef } from "react";

export default function AddReplyToReply({setReplyToReplyForm, parentId}: {setReplyToReplyForm: any, parentId: string}) {
const formRef = useRef<HTMLFormElement>(null)

    return (
        <div style={{ backgroundColor: 'lightyellow', marginLeft: '10px'}}>
            <form ref={formRef} action={async (formData: FormData) => {
                await createReply(parentId, formData);
                formRef?.current?.reset();
                setReplyToReplyForm(false)}
            }>
                <textarea name="content"></textarea>
                <button type="submit">Reply</button>
            </form>
        </div>
    );
}