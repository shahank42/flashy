"use client";

import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from '../ui/textarea';
import { createFlashcard, updateFlashcard } from '~/app/actions';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { FlashCard } from '~/app/dashboard/colums';


export const editFlashcardFormSchema = z.object({
  id: z.number(),
  question: z.string().min(1).max(256),
  answer: z.string().min(1).max(2048),
})

const EditFlashcardForm = ({ previousState, setDialogOpen }: {
  previousState: FlashCard
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const form = useForm<z.infer<typeof editFlashcardFormSchema>>({
    resolver: zodResolver(editFlashcardFormSchema),
    defaultValues: {
      id: previousState.id,
      question: previousState.question,
      answer: previousState.answer,
    }
  });

  const onSubmit = async (values: z.infer<typeof editFlashcardFormSchema>) => {
    await updateFlashcard(values);
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Type the question..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Textarea placeholder="Write the answer..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild> */}
        <Button type="submit">Edit Flashcard!</Button>
        {/* </DialogClose>
        </DialogFooter> */}
      </form>
    </Form>
  )
}

export default EditFlashcardForm