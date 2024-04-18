'use client'

import { useFormStatus } from 'react-dom'

export default function LogRegButton({
    variant,
}: {
    variant: 'login' | 'register'
}) {
    const { pending } = useFormStatus()

    return (
        <button type="submit">
            {variant === 'login' ? 'Login' : 'Register'}
            {pending ? '...' : ''}
        </button>
    )
}
