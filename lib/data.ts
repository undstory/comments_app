import { redirect } from 'next/navigation'
import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { translations } from '@/constants/translations'

export const fetchComments = async () => {
    const { noData } = translations
    try {
        const comments = await prisma.comment.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        })
        return comments
    } catch (e) {
        console.log(noData, e)
    }
}

export const fetchReplies = async () => {
    const { noData } = translations
    try {
        const replies = await prisma.reply.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        })
        return replies
    } catch (e) {
        console.log(noData, e)
    }
}

export const fetchUsers = async () => {
    const { noData } = translations
    try {
        const users = await prisma.user.findMany()
        return users
    } catch (e) {
        console.log(noData, e)
    }
}

export const fetchInfoAboutAuthor = async (id: string) => {
    const author = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    return author
}

export const createNewComment = async (
    content: string,
    idLoggedUser: string
) => {
    try {
        const comment = await prisma.comment.create({
            data: { content: content, authorId: idLoggedUser },
        })
        return comment
    } catch (error) {
        console.log(error)
    }
}

export const createNewReply = async (
    content: string,
    parentId: string,
    id: string
) => {
    try {
        const reply = await prisma.reply.create({
            data: { content: content, authorId: id, parentId },
        })
        return reply
    } catch (error) {
        console.log(error)
    }
}

export const addNewUser = async (
    username: string,
    email: string,
    password: string
) => {
    const isExistEmail = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    if (isExistEmail) {
        return {
            errors: {
                email: ['Email already exist'],
            },
        }
    }
    const salt = await bcrypt.genSalt(10)
    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: await bcrypt.hash(password, salt),
            },
        })

        return user
    } catch (error) {
        console.log(error)
    }
}

export const editContent = async (
    newContent: string,
    id: string,
    variant: string
) => {
    try {
        if (variant === 'comment') {
            const comment = await prisma.comment.update({
                data: {
                    content: newContent,
                },
                where: {
                    id: id,
                },
            })
            return comment
        } else {
            const reply = await prisma.reply.update({
                data: {
                    content: newContent,
                },
                where: {
                    id: id,
                },
            })
            return reply
        }
    } catch (error) {
        console.log(error)
    }
}

export const actualizeScore = async (
    score: number,
    id: string,
    variant: 'comment' | 'reply'
) => {
    try {
        if (variant === 'comment') {
            const comment = await prisma.comment.update({
                data: {
                    score: score,
                },
                where: {
                    id: id,
                },
            })
            return comment
        } else {
            const reply = await prisma.reply.update({
                data: {
                    score: score,
                },
                where: {
                    id: id,
                },
            })
            return reply
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeComment = async (id: string, variant: string) => {
    try {
        if (variant === 'comment') {
            const deleteIt = await prisma.comment.delete({
                where: {
                    id: id,
                },
            })

            return deleteIt
        } else {
            const deleteIt = await prisma.reply.delete({
                where: {
                    id: id,
                },
            })

            return deleteIt
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchUser = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        return user
    } catch (e) {
        console.log('nie znaleziono szukanych danych, e')
    }
}
