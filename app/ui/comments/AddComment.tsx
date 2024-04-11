'use client';

import { createComment } from "@/lib/actions";
import { useRef } from "react";

export default function AddComment() {
const formRef = useRef<HTMLFormElement>(null)

    return (
        <div>
            <form ref={formRef} action={createComment}>
                <textarea name="content"></textarea>
                <button type="submit">Add comment</button>
            </form>
        </div>
    );
}