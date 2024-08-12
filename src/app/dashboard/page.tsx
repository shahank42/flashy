import React from 'react'
import MaxWidthWrapper from '~/components/MaxWidthWrapper'
import { FlashCard } from './colums';
import TableView from './TableView';
import { getFlashcards } from '../actions';

const AdminPage = async () => {
  const data = (await getFlashcards()) as FlashCard[];

  return (
    <main className="">
      <MaxWidthWrapper>
        <div className="flex flex-col gap-3 mx-auto py-10 ">
          <TableView data={data} />
        </div>
      </MaxWidthWrapper>
    </main >
  )
}

export default AdminPage