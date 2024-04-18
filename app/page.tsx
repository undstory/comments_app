import { translations } from '@/constants/translations'
import Link from 'next/link'

export default function Home() {
    const { commentsApp, loginText, registerText, hereWord } = translations
    return (
        <div>
            <h2>{commentsApp}</h2>
            <p>
                {loginText} <Link href="/login">{hereWord}</Link>
            </p>
            <p>
                {registerText}
                <Link href="/register">{hereWord}</Link>
            </p>
        </div>
    )
}
