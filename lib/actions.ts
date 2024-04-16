"use server";

import { z } from "zod";
import {
  addNewUser,
  createNewComment,
  createNewReply,
  removeComment,
} from "./data";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { RefObject } from "react";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  content: z.string(),
});

const FormSchemaForUser = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

const CreateUser = FormSchemaForUser.omit({ id: true, createdAt: true });

const CreateComment = FormSchema.omit({ id: true, createdAt: true });
const CreateReply = FormSchema.omit({ id: true, createdAt: true });

export async function createNewUser(formData: FormData) {
  const { username, email, password } = CreateUser.parse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (
    !username ||
    typeof username !== "string" ||
    !email ||
    typeof email !== "string" ||
    !password ||
    typeof password !== "string"
  )
    return;
  const createdAt = new Date();

  await addNewUser(username, email, password);
  redirect("/login");
}

export async function createComment(formData: FormData, idLoggedUser?: string) {
  const { content } = CreateComment.parse({
    content: formData.get("content"),
  });
  if (!content || typeof content !== "string") return;
  const createdAt = new Date();
  if (idLoggedUser) await createNewComment(content, createdAt, idLoggedUser);

  revalidatePath("/comments");
}

export async function createReply(
  parentId: string,
  formData: FormData,
  id?: string
) {
  const { content } = CreateReply.parse({
    content: formData.get("content"),
  });
  if (!content || typeof content !== "string") return;
  const createdAt = new Date();
  if (id) await createNewReply(content, createdAt, parentId, id);

  revalidatePath("/comments");
}

export async function deleteComment(id: string, variant: string) {
  await removeComment(id, variant);
  revalidatePath("/comments");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
