'use client';

import { createReply } from "@/lib/actions";
import { useRef } from "react";

export default function AddReplyToReply({idLoggedUser, setReplyToReplyForm, parentId, nameOfAuthor}: {idLoggedUser?: string, setReplyToReplyForm: any, parentId: string, nameOfAuthor?: any}) {
const formRef = useRef<HTMLFormElement>(null)

    return (
        <div style={{ backgroundColor: 'lightyellow', marginLeft: '10px'}}>
            <form ref={formRef} action={async (formData: FormData) => {
                await createReply(parentId, formData, idLoggedUser);
                formRef?.current?.reset();
                setReplyToReplyForm(false)}
            }>
                <textarea name="content" defaultValue={`@${nameOfAuthor[0].username}, `}></textarea>
                <button type="submit">Reply</button>
            </form>
        </div>
    );
}