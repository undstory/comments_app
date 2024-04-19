'use client'

import { translations } from '@/constants/translations'
import { createReply } from '@/lib/actions'
import { User } from '@/lib/types'
import { SetStateAction, useRef } from 'react'

type AddReplyType = {
    idLoggedUser?: string
    parentId: string
    setReplyForm: (value: boolean) => void
    nameOfAuthor: User[]
}

export default function AddReply({
    idLoggedUser,
    parentId,
    setReplyForm,
    nameOfAuthor,
}: AddReplyType) {
    const formRef = useRef<HTMLFormElement>(null)
    const { addReply } = translations

    return (
        <div>
            <form
                ref={formRef}
                action={async (formData: FormData) => {
                    await createReply(parentId, formData, idLoggedUser)
                    formRef?.current?.reset()
                    setReplyForm(false)
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
