"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addFlashcardFormSchema } from "~/components/forms/AddFlashcardForm";
import { editFlashcardFormSchema } from "~/components/forms/EditFlashcardForm";
import { db } from "~/server/db";
import { flashcards } from "~/server/db/schema";

export async function getFlashcards() {
  return db.select({
    id: flashcards.id,
    question: flashcards.question,
    answer: flashcards.answer,
  }).from(flashcards);

}

export async function createFlashcard(values: z.infer<typeof addFlashcardFormSchema>) {
  await db.insert(flashcards).values(values);
  revalidatePath("/admin")
}

export async function updateFlashcard(values: z.infer<typeof editFlashcardFormSchema>) {
  await db.update(flashcards)
    .set({
      question: values.question,
      answer: values.answer,
    })
    .where(eq(flashcards.id, values.id))
  revalidatePath("/admin")
}

export async function deleteFlashcard(id: number) {
  await db.delete(flashcards).where(eq(flashcards.id, id))
  revalidatePath("/admin")
}