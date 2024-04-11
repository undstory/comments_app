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

export const fetchInfoAboutAuthor = async (id: string) => {
  const author = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return author;
};

export const createNewComment = async (content: string, date: Date) => {
  const authorId = "cluuv3sfa0001tbmmbbuk9mi7";

  try {
    const comment = await prisma.comment.create({
      data: { content: content, authorId },
    });
    return comment;
  } catch (error) {
    console.log(error);
  }
};
