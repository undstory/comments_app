'use client'

import { translations } from '@/constants/translations'
import { createReply } from '@/lib/actions'
import { User } from '@/lib/types'
import { useRef } from 'react'

type AddReplyToReplyType = {
    idLoggedUser?: string
    setReplyToReplyForm: (value: boolean) => void
    parentId: string
    nameOfAuthor: User[]
}

export default function AddReplyToReply({
    idLoggedUser,
    setReplyToReplyForm,
    parentId,
    nameOfAuthor,
}: AddReplyToReplyType) {
    const formRef = useRef<HTMLFormElement>(null)
    const { addReply } = translations
    return (
        <div style={{ backgroundColor: 'lightyellow', marginLeft: '10px' }}>
            <form
                ref={formRef}
                action={async (formData: FormData) => {
                    await createReply(parentId, formData, idLoggedUser)
                    formRef?.current?.reset()
                    setReplyToReplyForm(false)
                }}
            >
                <textarea
                    name="content"
                    defaultValue={`@${nameOfAuthor[0].username}, `}
                ></textarea>
                <button type="submit">{addReply}</button>
            </form>
        </div>
    )
}
