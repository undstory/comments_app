'use client';

import { createReply } from "@/lib/actions";
import { useRef } from "react";

export default function AddReply({parentId}: {parentId: string}) {
const formRef = useRef<HTMLFormElement>(null)
const createNewReply = createReply.bind(null, parentId)
    return (
        <div>
            <form ref={formRef} action={createNewReply}>
                <textarea name="content"></textarea>
                <button type="submit">Add reply</button>
            </form>
        </div>
    );
}