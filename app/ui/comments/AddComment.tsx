'use client';

import { createComment } from "@/lib/actions";
import { useRef } from "react";

export default function AddComment({idLoggedUser} : {idLoggedUser?: string}) {
const formRef = useRef<HTMLFormElement>(null)

    return (
        <div>
            <form ref={formRef} action={async (formData: FormData) => {
                await createComment(formData, idLoggedUser);
                formRef?.current?.reset(); }
            }>
                <textarea name="content"></textarea>

                <button type="submit">Add comment</button>
            </form>
        </div>
    );
}
