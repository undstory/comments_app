import prisma from "../lib/prisma";

export const fetchComments = async () => {
  try {
    const comments = await prisma.comment.findMany();
    return comments;
  } catch (e) {
    console.log("nie znaleziono szukanych danych", e);
  }
};

export const fetchReplies = async () => {
  try {
    const replies = await prisma.reply.findMany();
    return replies;
  } catch (e) {
    console.log("nie znaleziono szukanych danych, e");
  }
};

export const fetchUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (e) {
    console.log("nie znaleziono szukanych danych, e");
  }
};

export const fetchInfoAboutAuthor = async (id: string) => {
  const author = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return author;
};

export const createNewComment = async (content: string, date: Date) => {
  const authorId = "cluuv37mt0000tbmmethcuwv0"; //aga

  try {
    const comment = await prisma.comment.create({
      data: { content: content, authorId },
    });
    return comment;
  } catch (error) {
    console.log(error);
  }
};

export const createNewReply = async (
  content: string,
  date: Date,
  parentId: string
) => {
  const authorId = "cluuv37mt0000tbmmethcuwv0";

  try {
    const reply = await prisma.reply.create({
      data: { content: content, authorId, parentId },
    });
    return reply;
  } catch (error) {
    console.log(error);
  }
};

export const removeComment = async (id: string, variant: string) => {
  try {
    if (variant === "comment") {
      const deleteIt = await prisma.comment.delete({
        where: {
          id: id,
        },
      });

      return deleteIt;
    } else {
      const deleteIt = await prisma.reply.delete({
        where: {
          id: id,
        },
      });

      return deleteIt;
    }
  } catch (error) {
    console.log(error);
  }
};
