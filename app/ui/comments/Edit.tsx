import { translations } from '@/constants/translations'
import { updateContent } from '@/lib/actions'

type EditType = {
    setEditState?: any
    id?: string
    replyId?: string
    variant: string
    content?: string
    replyContent?: string
}

export default function Edit({
    content,
    replyContent,
    id,
    replyId,
    setEditState,
    variant,
}: EditType) {
    const { edit } = translations
    const idEditedThing = id || replyId
    return (
        <form
            action={async (formData: FormData) => {
                await updateContent(variant, formData, idEditedThing)
                setEditState(false)
            }}
        >
            <textarea
                name="newContent"
                defaultValue={content || replyContent}
            />
            <button type="submit">{edit}</button>
        </form>
    )
}
