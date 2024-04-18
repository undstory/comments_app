export type Reply = {
    id: string
    content: string
    createdAt?: Date
    score?: number
    parentId: string
    authorId: string
}

export type Comment = {
    id: string
    content: string
    createdAt?: Date
    score?: number
    authorId: string
    replies?: Reply[]
}

export type User = {
    id: string
    username: string
    email: string
    createdAt: Date
    updatedAt: Date
    avatar?: string
    comments?: Comment[]
    replies?: Reply[]
}
