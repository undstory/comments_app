'use client';

import { createReply } from "@/lib/actions";
import { useRef } from "react";

export default function AddReply({idLoggedUser, parentId, setReplyForm, nameOfAuthor }: {idLoggedUser?: string, parentId: string, setReplyForm: any, nameOfAuthor: any }) {
const formRef = useRef<HTMLFormElement>(null)


    return (
        <div>
            <form ref={formRef} action={async (formData: FormData) => {
                await createReply(parentId, formData, idLoggedUser);
                formRef?.current?.reset();
                setReplyForm(false)
            }
            }>
                <textarea name="content" defaultValue={`@${nameOfAuthor[0].username}, `}></textarea>
                <button type="submit">Add reply</button>
            </form>
        </div>
    );
}