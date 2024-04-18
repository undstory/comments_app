'use client'

import { translations } from '@/constants/translations';
import { useFormStatus } from 'react-dom'

export default function LogRegButton({
    variant,
}: {
    variant: 'login' | 'register'
}) {
    const { pending } = useFormStatus()
    const { loginWord, registerWord } = translations;

    return (
        <button type="submit">
            {variant === 'login' ? loginWord : registerWord}
            {pending ? '...' : ''}
        </button>
    )
}
