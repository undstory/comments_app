import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    // Defining a matcher to specify routes where the middleware should be applied
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
