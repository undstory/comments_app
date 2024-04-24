import { Box, Button, Modal, Typography, useTheme } from '@mui/material'
import DeleteIt from './DeleteIt'
import { translations } from '@/constants/translations'

export default function DeleteModal({
    isOpenModal,
    setIsOpenModal,
    variant,
    id,
    replyId,
    authorId,
    replyAuthorId,
    idLoggedUser,
}: {
    isOpenModal: boolean
    setIsOpenModal?: any
    variant: 'reply' | 'comment'
    id?: string
    replyId?: string
    authorId?: string
    replyAuthorId?: string
    idLoggedUser?: string
}) {
    const theme = useTheme()

    console.log(idLoggedUser)

    const { deleteComment, deleteText, noCancel, yesDelete } = translations
    return (
        <Modal
            open={isOpenModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClose={() => setIsOpenModal(false)}
        >
            <Box
                sx={{
                    display: 'flex',
                    borderRadius: '10px',
                    p: 4,
                    flexDirection: 'column',
                    bgcolor: theme.palette.primary.light,
                    width: '380px',
                    height: 'auto',
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                >
                    {deleteComment}
                </Typography>
                <Typography sx={{ mt: 2, color: theme.palette.secondary.dark }}>
                    {deleteText}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        pt: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    <Button
                        onClick={() => setIsOpenModal(false)}
                        variant="contained"
                        size="small"
                        sx={{
                            bgcolor: theme.palette.secondary.dark,
                            color: theme.palette.secondary.main,
                            fontWeight: '500',
                            width: '100%',
                            p: 1,
                            ':hover': {
                                color: theme.palette.secondary.dark,
                                bgcolor: theme.palette.secondary.main,
                            },
                        }}
                    >
                        {noCancel}
                    </Button>

                    {authorId === idLoggedUser && variant === 'comment' && (
                        <DeleteIt variant={variant} id={id} replyId={replyId} />
                    )}
                    {replyAuthorId === idLoggedUser && variant === 'reply' ? (
                        <DeleteIt variant={variant} id={id} replyId={replyId} />
                    ) : null}
                </Box>
            </Box>
        </Modal>
    )
}
