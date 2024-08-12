"use client";

import React from 'react'
import { DataTablePagination } from './DataTablePagination'
import { columns, FlashCard } from './colums';
import { useReactTable, getCoreRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, SortingState, VisibilityState, getSortedRowModel } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import AddFlashcardForm from '~/components/forms/AddFlashcardForm';
import { Pencil2Icon } from '@radix-ui/react-icons';
import EditFlashcardForm from '~/components/forms/EditFlashcardForm';
import { deleteFlashcard } from '../actions';

const TableView = ({ data }: { data: FlashCard[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [addFlashcardDialogOpen, setAddFlashcardDialogOpen] = React.useState(false)
  const [editFlashcardDialogOpen, setEditFlashcardDialogOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>
      <div className="flex w-full justify-end gap-2">
        <Dialog open={addFlashcardDialogOpen} onOpenChange={setAddFlashcardDialogOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline"><PlusIcon /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Flashcard</DialogTitle>
            </DialogHeader>
            <AddFlashcardForm setDialogOpen={setAddFlashcardDialogOpen} />
          </DialogContent>
        </Dialog>

        <Dialog open={editFlashcardDialogOpen} onOpenChange={setEditFlashcardDialogOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline" disabled={table.getFilteredSelectedRowModel().rows.length != 1}>
              <Pencil2Icon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Flashcard</DialogTitle>
            </DialogHeader>
            <EditFlashcardForm setDialogOpen={setEditFlashcardDialogOpen} previousState={table.getFilteredSelectedRowModel().rows[0]?.original ?? {} as FlashCard} />
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive" disabled={table.getFilteredSelectedRowModel().rows.length < 1}>
              <Trash2Icon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete Selected Flashcard{table.getFilteredSelectedRowModel().rows.length > 1 ? "s" : ""}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone, and will permanently delete the flashcard{table.getFilteredSelectedRowModel().rows.length > 1 ? "s" : ""} from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" onClick={async () => {
                  const selectedFlashcards = table.getFilteredSelectedRowModel().rows;
                  for (const flashcard of selectedFlashcards) await deleteFlashcard(flashcard.original.id);
                }} >Delete Flashcard{table.getFilteredSelectedRowModel().rows.length > 1 ? "s" : ""}</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <DataTable table={table} />
      <DataTablePagination table={table} />
    </>
  )
}

export default TableView