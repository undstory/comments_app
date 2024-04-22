'use client'

import { signOut } from '@/auth'
import { translations } from '@/constants/translations'
import { Button, FormControl } from '@mui/material'
import SignOutButton from './SignOutButton'

export default function SignOutForm() {
    return (
        <FormControl
            action={async () => {
                await signOut()
            }}
            component="form"
        >
            <SignOutButton />
        </FormControl>
    )
}
