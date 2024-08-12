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
import { createFlashcard } from '~/app/actions';
import { DialogClose, DialogFooter } from '../ui/dialog';


export const addFlashcardFormSchema = z.object({
  question: z.string().min(1).max(256),
  answer: z.string().min(1).max(2048),
})

const AddFlashcardForm = ({
  setDialogOpen
}: {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const form = useForm<z.infer<typeof addFlashcardFormSchema>>({
    resolver: zodResolver(addFlashcardFormSchema),
    defaultValues: {
      question: "",
      answer: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof addFlashcardFormSchema>) => {
    await createFlashcard(values);
    setDialogOpen(false)
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

        <DialogFooter className="sm:justify-start">
          {/* <DialogClose asChild> */}
            <Button type="submit">Add Flashcard</Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </form>
    </Form>
  )
}

export default AddFlashcardForm