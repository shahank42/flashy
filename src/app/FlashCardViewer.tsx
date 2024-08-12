import React, { useState } from 'react'
import { getFlashcards } from './actions';
import { FlashCardStack } from './FlashCardStack';

type FlashCard = {
  id: number;
  question: string;
  answer: string;
};

const FlashCardViewer = async () => {
  const cards = (await getFlashcards()) as FlashCard[];

  return (
    <>
      <FlashCardStack items={cards} />
    </>
  )
}

export default FlashCardViewer