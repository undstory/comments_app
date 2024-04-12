'use client';

import { useRef } from "react";

export default function AddReplyToReply({setReplyToReplyForm, parentId}: {setReplyToReplyForm: any, parentId: string}) {
const formRef = useRef<HTMLFormElement>(null)

    return (
        <div style={{ backgroundColor: 'lightyellow', marginLeft: '10px'}}>
            <form ref={formRef} action={() => setReplyToReplyForm(false)}>
                <textarea name="content"></textarea>
                <button type="submit">Reply</button>
            </form>
        </div>
    );
}