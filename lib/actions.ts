"use server";

import { z } from "zod";
import { createNewComment } from "./data";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { RefObject } from "react";

const FormSchema = z.object({
  id: z.string(),
  content: z.string(),
});

const CreateComment = FormSchema.omit({ id: true, createdAt: true });

export async function createComment(formData: FormData) {
  const { content } = CreateComment.parse({
    content: formData.get("content"),
  });
  if (!content || typeof content !== "string") return;
  const createdAt = new Date();

  await createNewComment(content, createdAt);

  revalidatePath("/comments");
}
