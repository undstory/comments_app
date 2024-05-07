'use server'

import { z } from 'zod'
import {
    addNewUser,
    actualizeScore,
    createNewComment,
    createNewReply,
    editContent,
    removeComment,
} from './data'
import { revalidatePath } from 'next/cache'
import prisma from './prisma'
import { RefObject } from 'react'
import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { translations } from '@/constants/translations'

const { invalidCredentialsText, goWrongText } = translations

const FormSchema = z.object({
    id: z.string(),
    content: z.string(),
})

const FormSchemaForUser = z.object({
    id: z.string(),
    username: z.string().min(3).max(255),
    password: z.string().min(3).max(50),
    email: z.string().email(),
})

const CreateUser = FormSchemaForUser.omit({ id: true })

const CreateComment = FormSchema.omit({ id: true })
const CreateReply = FormSchema.omit({ id: true })

export async function createNewUser(formData: FormData) {
    const { username, email, password } = CreateUser.parse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (
        !username ||
        typeof username !== 'string' ||
        !email ||
        typeof email !== 'string' ||
        !password ||
        typeof password !== 'string'
    )
        return

    await addNewUser(username, email, password)
    redirect('/login')
}

export async function createComment(formData: FormData, idLoggedUser?: string) {
    const { content } = CreateComment.parse({
        content: formData.get('content'),
    })
    if (!content || typeof content !== 'string') return
    if (idLoggedUser) await createNewComment(content, idLoggedUser)

    revalidatePath('/comments')
}

export async function createReply(
    parentId: string,
    formData: FormData,
    id?: string
) {
    const { content } = CreateReply.parse({
        content: formData.get('content'),
    })
    if (!content || typeof content !== 'string') return
    if (id) await createNewReply(content, parentId, id)

    revalidatePath('/comments')
}

export async function actualize(
    score: number,
    id: string,
    variant: 'comment' | 'reply'
) {
    await actualizeScore(score, id, variant)
    revalidatePath('/comments')
}

export async function deleteComment(id: string, variant: string) {
    await removeComment(id, variant)
    revalidatePath('/comments')
}
const updateText = FormSchema.omit({ id: true })

export async function updateContent(
    variant: string,
    formData: FormData,
    idEditedThing?: string
) {
    const { content } = updateText.parse({
        content: formData.get('newContent'),
    })
    if (idEditedThing && content && variant)
        await editContent(content, idEditedThing, variant)
    revalidatePath('/comments')
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return invalidCredentialsText
                default:
                    return goWrongText
            }
        }
        throw error
    }
}

export async function leave() {
    try {
        await signOut()
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return invalidCredentialsText
                default:
                    return goWrongText
            }
        }
        throw error
    }
}
