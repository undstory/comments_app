'use client';

import { createComment } from "@/lib/actions";
import { useRef } from "react";

export default function AddComment({id} : {id?: string}) {
const formRef = useRef<HTMLFormElement>(null)

console.log(id);

    return (
        <div>
            <form ref={formRef} action={async (formData: FormData) => {
                await createComment(formData, id);
                formRef?.current?.reset(); }
            }>
                <textarea name="content"></textarea>

                <button type="submit">Add comment</button>
            </form>
        </div>
    );
}
