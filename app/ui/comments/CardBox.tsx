import { Comment, Reply, User } from '@/lib/types'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import DeleteIt from './DeleteIt'
import Edit from './Edit'
import { translations } from '@/constants/translations'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    styled,
    useTheme,
} from '@mui/material'

import ReplyIcon from '../svgicons/ReplyIcon'
import EditIcon from '../svgicons/EditIcon'
import DeleteModal from './DeleteModal'
import DeleteIcon from '../svgicons/DeleteIcon'
import ScoreBox from './ScoreBox'
import moment from 'moment'

type CardType = {
    variant: 'comment' | 'reply'
    comment?: Comment
    reply?: Reply
    replyForm?: boolean
    setReplyForm?: Dispatch<SetStateAction<boolean>>
    replyToReplyForm?: boolean
    setReplyToReplyForm?: Dispatch<SetStateAction<boolean>>
    idLoggedUser?: string
    users?: User[]
    setAuthorOfId: (value: string) => void
    authorOfId?: string
}

export default function CardBox({
    idLoggedUser,
    authorOfId,
    setAuthorOfId,
    users,
    variant,
    comment,
    reply,
    replyForm,
    setReplyForm,
    replyToReplyForm,
    setReplyToReplyForm,
}: CardType) {
    const [editState, setEditState] = useState<boolean>(false)
    const { content, id, authorId, score, createdAt } = comment || {}
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [deleteHover, setDeleteHover] = useState<boolean>(false)
    const [editHover, setEditHover] = useState<boolean>(false)
    const [replyHover, setReplyHover] = useState<boolean>(false)
    const theme = useTheme()
    const { you, deleteIt } = translations
    const {
        content: replyContent,
        id: replyId,
        authorId: replyAuthorId,
        score: replyScore,
        createdAt: replyCreatedAt,
    } = reply || {}

    const handleReplyForm = () => {
        setReplyForm && setReplyForm(() => !replyForm)
        authorId && setAuthorOfId(authorId)
    }
    console.log(createdAt)

    const handleReplyToReplyForm = () => {
        setReplyToReplyForm && setReplyToReplyForm(() => !replyToReplyForm)
        replyAuthorId && setAuthorOfId(replyAuthorId)
    }
    const authorOfComment =
        users && comment && users.filter((user) => user.id === comment.authorId)
    const authorOfReply =
        users && reply && users.filter((user) => user.id === replyAuthorId)
    const { addReply, edit } = translations

    const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`)

    const StyledButton = styled(Button)(`
justify-content: flex-end;
padding: 6px 0 6px 8px;
`)

    const contents = (content: string | undefined): ReactNode => {
        let array = content?.split(' ')
        const tag = array?.filter((el) => el.includes('@'))
        const restOfContent = array?.filter((el) => el !== tag?.[0])

        return (
            <Box>
                <Typography sx={{ color: theme.palette.primary.main }}>
                    <Typography
                        component="span"
                        sx={{
                            color: theme.palette.secondary.contrastText,
                            fontWeight: '600',
                        }}
                    >
                        {tag}{' '}
                    </Typography>
                    {restOfContent?.join(' ')}{' '}
                </Typography>
            </Box>
        )
    }

    return (
        <Card
            sx={{
                bgcolor: theme.palette.primary.light,
                width: {
                    md: variant === 'comment' ? '620px' : '580px',
                    xs: variant === 'comment' ? '350px' : '320px',
                },
                minHeight: '120px',
                display: 'flex',
                p: 2.5,
                gap: '16px',
            }}
        >
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                {variant === 'comment' ? (
                    <ScoreBox
                        scoreValue={score}
                        authorOfComment={authorOfComment}
                        idLoggedUser={idLoggedUser}
                        variant={variant}
                        id={id}
                    />
                ) : (
                    <ScoreBox
                        scoreValue={replyScore}
                        authorOfReply={authorOfReply}
                        idLoggedUser={idLoggedUser}
                        variant={variant}
                        id={replyId}
                    />
                )}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    width: '100%',
                    gap: {
                        xs: '20px',
                        md: '10px',
                    },
                }}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box display="flex" alignItems="center" gap="12px">
                        <Avatar
                            sx={{ width: 32, height: 32 }}
                            alt="image of author"
                        />
                        {variant === 'comment' && (
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: theme.palette.primary.main,
                                }}
                            >
                                {authorOfComment && authorOfComment[0].username}
                            </Typography>
                        )}
                        {variant === 'reply' && (
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: theme.palette.primary.main,
                                }}
                            >
                                {authorOfReply && authorOfReply[0].username}
                            </Typography>
                        )}
                        {(authorOfComment &&
                            authorOfComment[0].id === idLoggedUser) ||
                        (authorOfReply &&
                            authorOfReply[0].id === idLoggedUser) ? (
                            <Typography
                                sx={{
                                    color: theme.palette.primary.light,
                                    bgcolor:
                                        theme.palette.secondary.contrastText,
                                    px: '6px',
                                    borderRadius: '2px',
                                    fontSize: '12px',
                                    lineHeight: 1.6,
                                }}
                            >
                                {you}
                            </Typography>
                        ) : null}
                        <Typography
                            sx={{
                                color: theme.palette.secondary.dark,
                                fontSize: '14px',
                            }}
                        >
                            {variant === 'comment'
                                ? moment(createdAt).fromNow()
                                : moment(replyCreatedAt).fromNow()}
                        </Typography>
                    </Box>
                    <Box
                        flexDirection="row"
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex',
                            },
                        }}
                    >
                        {replyAuthorId !== idLoggedUser &&
                            variant === 'reply' && (
                                <Button
                                    startIcon={
                                        <ReplyIcon
                                            color={
                                                replyHover
                                                    ? theme.palette.info.main
                                                    : theme.palette.secondary
                                                          .contrastText
                                            }
                                        />
                                    }
                                    variant="text"
                                    sx={{
                                        gap: '5px',
                                        textTransform: 'none',
                                        color: theme.palette.secondary
                                            .contrastText,
                                        ':hover': {
                                            bgcolor: 'transparent',
                                            color: theme.palette.info.main,
                                        },
                                    }}
                                    onMouseEnter={() => setReplyHover(true)}
                                    onMouseLeave={() => setReplyHover(false)}
                                    onClick={handleReplyToReplyForm}
                                >
                                    {addReply}
                                </Button>
                            )}
                        {authorId !== idLoggedUser && variant === 'comment' && (
                            <Button
                                startIcon={
                                    <ReplyIcon
                                        color={
                                            replyHover
                                                ? theme.palette.info.main
                                                : theme.palette.secondary
                                                      .contrastText
                                        }
                                    />
                                }
                                variant="text"
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.secondary.contrastText,
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.main,
                                    },
                                }}
                                onClick={handleReplyForm}
                                onMouseEnter={() => setReplyHover(true)}
                                onMouseLeave={() => setReplyHover(false)}
                            >
                                {addReply}
                            </Button>
                        )}
                        {authorId === idLoggedUser && variant === 'comment' ? (
                            <Button
                                variant="text"
                                onClick={() => setIsOpenModal(true)}
                                startIcon={
                                    <DeleteIcon
                                        color={
                                            deleteHover
                                                ? theme.palette.info
                                                      .contrastText
                                                : theme.palette.primary
                                                      .contrastText
                                        }
                                    />
                                }
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.primary.contrastText,
                                    fontSize: '600',
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.contrastText,
                                    },
                                }}
                                type="button"
                                onMouseEnter={() => setDeleteHover(true)}
                                onMouseLeave={() => setDeleteHover(false)}
                            >
                                {deleteIt}
                            </Button>
                        ) : null}
                        {replyAuthorId === idLoggedUser &&
                        variant === 'reply' ? (
                            <Button
                                variant="text"
                                onClick={() => setIsOpenModal(true)}
                                startIcon={
                                    <DeleteIcon
                                        color={
                                            deleteHover
                                                ? theme.palette.info
                                                      .contrastText
                                                : theme.palette.primary
                                                      .contrastText
                                        }
                                    />
                                }
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.primary.contrastText,
                                    fontSize: '600',
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.contrastText,
                                    },
                                }}
                                type="button"
                                onMouseEnter={() => setDeleteHover(true)}
                                onMouseLeave={() => setDeleteHover(false)}
                            >
                                {deleteIt}
                            </Button>
                        ) : null}

                        {isOpenModal ? (
                            <DeleteModal
                                isOpenModal={isOpenModal}
                                setIsOpenModal={setIsOpenModal}
                                authorId={authorId}
                                replyAuthorId={replyAuthorId}
                                idLoggedUser={idLoggedUser}
                                variant={variant}
                                id={id}
                                replyId={replyId}
                            />
                        ) : null}

                        {authorId === idLoggedUser && variant === 'comment' ? (
                            <Button
                                startIcon={
                                    <EditIcon
                                        color={
                                            editHover
                                                ? theme.palette.info.main
                                                : theme.palette.secondary
                                                      .contrastText
                                        }
                                    />
                                }
                                variant="text"
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.secondary.contrastText,
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.main,
                                    },
                                }}
                                onClick={() => setEditState(!editState)}
                                onMouseEnter={() => setEditHover(true)}
                                onMouseLeave={() => setEditHover(false)}
                            >
                                {edit}
                            </Button>
                        ) : null}
                        {replyAuthorId === idLoggedUser &&
                        variant === 'reply' ? (
                            <StyledButton
                                startIcon={
                                    <EditIcon
                                        color={
                                            editHover
                                                ? theme.palette.info.main
                                                : theme.palette.secondary
                                                      .contrastText
                                        }
                                    />
                                }
                                variant="text"
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.secondary.contrastText,
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.main,
                                    },
                                }}
                                onClick={() => setEditState(!editState)}
                                onMouseEnter={() => setEditHover(true)}
                                onMouseLeave={() => setEditHover(false)}
                            >
                                {edit}
                            </StyledButton>
                        ) : null}
                    </Box>
                </Box>
                <Box>
                    {editState ? (
                        <Edit
                            setEditState={setEditState}
                            content={content}
                            replyContent={replyContent}
                            variant={variant}
                            id={id}
                            replyId={replyId}
                        />
                    ) : (
                        <CardContentNoPadding sx={{ p: 0 }}>
                            <Typography
                                variant="body1"
                                component="div"
                                sx={{ color: theme.palette.secondary.dark }}
                            >
                                {variant === 'comment'
                                    ? contents(content)
                                    : contents(replyContent)}
                            </Typography>
                        </CardContentNoPadding>
                    )}
                </Box>
                <Box
                    sx={{
                        display: {
                            xs: 'flex',
                        },
                        justifyContent: {
                            xs: 'space-between',
                        },
                        alignItems: {
                            xs: 'center',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: 'flex',
                                md: 'none',
                            },
                        }}
                    >
                        {variant === 'comment' ? (
                            <ScoreBox
                                scoreValue={score}
                                authorOfComment={authorOfComment}
                                idLoggedUser={idLoggedUser}
                                variant={variant}
                                id={id}
                            />
                        ) : (
                            <ScoreBox
                                scoreValue={replyScore}
                                authorOfReply={authorOfReply}
                                idLoggedUser={idLoggedUser}
                                variant={variant}
                                id={replyId}
                            />
                        )}
                    </Box>
                    <Box
                        flexDirection="row"
                        sx={{
                            display: {
                                xs: 'flex',
                                md: 'none',
                            },
                            justifyContent: {
                                xs: 'flex-end',
                            },
                        }}
                    >
                        {replyAuthorId !== idLoggedUser &&
                            variant === 'reply' && (
                                <Button
                                    startIcon={
                                        <ReplyIcon
                                            color={
                                                replyHover
                                                    ? theme.palette.info.main
                                                    : theme.palette.secondary
                                                          .contrastText
                                            }
                                        />
                                    }
                                    variant="text"
                                    sx={{
                                        gap: '5px',
                                        textTransform: 'none',
                                        color: theme.palette.secondary
                                            .contrastText,
                                        ':hover': {
                                            bgcolor: 'transparent',
                                            color: theme.palette.info.main,
                                        },
                                    }}
                                    onMouseEnter={() => setReplyHover(true)}
                                    onMouseLeave={() => setReplyHover(false)}
                                    onClick={handleReplyToReplyForm}
                                >
                                    {addReply}
                                </Button>
                            )}
                        {authorId !== idLoggedUser && variant === 'comment' && (
                            <Button
                                startIcon={
                                    <ReplyIcon
                                        color={
                                            replyHover
                                                ? theme.palette.info.main
                                                : theme.palette.secondary
                                                      .contrastText
                                        }
                                    />
                                }
                                variant="text"
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.secondary.contrastText,
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.main,
                                    },
                                }}
                                onClick={handleReplyForm}
                                onMouseEnter={() => setReplyHover(true)}
                                onMouseLeave={() => setReplyHover(false)}
                            >
                                {addReply}
                            </Button>
                        )}
                        {authorId === idLoggedUser && variant === 'comment' ? (
                            <Button
                                variant="text"
                                onClick={() => setIsOpenModal(true)}
                                startIcon={
                                    <DeleteIcon
                                        color={
                                            deleteHover
                                                ? theme.palette.info
                                                      .contrastText
                                                : theme.palette.primary
                                                      .contrastText
                                        }
                                    />
                                }
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.primary.contrastText,
                                    fontSize: '600',
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.contrastText,
                                    },
                                }}
                                type="button"
                                onMouseEnter={() => setDeleteHover(true)}
                                onMouseLeave={() => setDeleteHover(false)}
                            >
                                {deleteIt}
                            </Button>
                        ) : null}
                        {replyAuthorId === idLoggedUser &&
                        variant === 'reply' ? (
                            <Button
                                variant="text"
                                onClick={() => setIsOpenModal(true)}
                                startIcon={
                                    <DeleteIcon
                                        color={
                                            deleteHover
                                                ? theme.palette.info
                                                      .contrastText
                                                : theme.palette.primary
                                                      .contrastText
                                        }
                                    />
                                }
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.primary.contrastText,
                                    fontSize: '600',
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.contrastText,
                                    },
                                }}
                                type="button"
                                onMouseEnter={() => setDeleteHover(true)}
                                onMouseLeave={() => setDeleteHover(false)}
                            >
                                {deleteIt}
                            </Button>
                        ) : null}

                        {isOpenModal ? (
                            <DeleteModal
                                isOpenModal={isOpenModal}
                                setIsOpenModal={setIsOpenModal}
                                authorId={authorId}
                                replyAuthorId={replyAuthorId}
                                idLoggedUser={idLoggedUser}
                                variant={variant}
                                id={id}
                                replyId={replyId}
                            />
                        ) : null}

                        {authorId === idLoggedUser && variant === 'comment' ? (
                            <Button
                                startIcon={
                                    <EditIcon
                                        color={
                                            editHover
                                                ? theme.palette.info.main
                                                : theme.palette.secondary
                                                      .contrastText
                                        }
                                    />
                                }
                                variant="text"
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.secondary.contrastText,
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.main,
                                    },
                                }}
                                onClick={() => setEditState(!editState)}
                                onMouseEnter={() => setEditHover(true)}
                                onMouseLeave={() => setEditHover(false)}
                            >
                                {edit}
                            </Button>
                        ) : null}
                        {replyAuthorId === idLoggedUser &&
                        variant === 'reply' ? (
                            <StyledButton
                                startIcon={
                                    <EditIcon
                                        color={
                                            editHover
                                                ? theme.palette.info.main
                                                : theme.palette.secondary
                                                      .contrastText
                                        }
                                    />
                                }
                                variant="text"
                                sx={{
                                    gap: '5px',
                                    textTransform: 'none',
                                    color: theme.palette.secondary.contrastText,
                                    ':hover': {
                                        bgcolor: 'transparent',
                                        color: theme.palette.info.main,
                                    },
                                }}
                                onClick={() => setEditState(!editState)}
                                onMouseEnter={() => setEditHover(true)}
                                onMouseLeave={() => setEditHover(false)}
                            >
                                {edit}
                            </StyledButton>
                        ) : null}
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}
