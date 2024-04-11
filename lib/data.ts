import { NextResponse } from "next/server";
import prisma from "../lib/prisma";

export const fetchComments = async () => {
  const comments = await prisma.comment.findMany();
  return comments;
};

export const fetchReplies = async () => {
  const replies = await prisma.reply.findMany();
  return replies;
};

export const fetchInfoAboutAuthor = async (id: string) => {
  const author = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return author;
};
