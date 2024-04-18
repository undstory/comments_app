import { translations } from '@/constants/translations'
import { deleteComment } from '@/lib/actions'

export default function DeleteIt({
    id,
    replyId,
    variant,
}: {
    id?: string
    replyId?: string
    variant: 'comment' | 'reply'
}) {
    const deleteThisShit = id && deleteComment.bind(null, id, variant)
    const deleteThisReply =
        replyId && deleteComment.bind(null, replyId, variant)
    const { deleteIt } = translations
    return (
        <form action={variant === 'comment' ? deleteThisShit : deleteThisReply}>
            <button type="submit">{deleteIt}</button>
        </form>
    )
}
