'use client';

import { translations } from "@/constants/translations";
import { createComment } from "@/lib/actions";
import { useRef } from "react";

export default function AddComment({idLoggedUser} : {idLoggedUser?: string}) {
const formRef = useRef<HTMLFormElement>(null)
const { addComment } = translations;

    return (
        <div>
            <form ref={formRef} action={async (formData: FormData) => {
                await createComment(formData, idLoggedUser);
                formRef?.current?.reset(); }
            }>
                <textarea name="content"></textarea>

                <button type="submit">{addComment}</button>
            </form>
        </div>
    );
}
