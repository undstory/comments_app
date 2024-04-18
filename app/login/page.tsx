'use client'

import { authenticate } from '@/lib/actions'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import LogRegButton from '../ui/login/LogRegButton'
import { translations } from '@/constants/translations'

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)
    const { backToHomeText, hereWord } = translations
    return (
        <div>
            <h2>
                {backToHomeText}
                <Link href="/">{hereWord}</Link>
            </h2>
            <form
                action={dispatch}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: '10px',
                }}
            >
                <input
                    name="email"
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                />
                <input
                    name="password"
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder="password"
                />
                <LogRegButton variant="login" />
                {errorMessage && (
                    <>
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </form>
        </div>
    )
}
