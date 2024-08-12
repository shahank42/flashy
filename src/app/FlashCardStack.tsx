"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "~/components/ui/card"
import { FlashCard } from "./dashboard/colums";
import { Button, buttonVariants } from "~/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";

type Card = {
  id: number;
  question: string;
  answer: string;
};

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;
const MAX_STACK_SHOWN = 3;

export const FlashCardStack = ({ items }: {
  items: FlashCard[],
}) => {
  const [cards, setCards] = useState<FlashCard[]>(items);
  const [answerShown, setAnswerShown] = useState<boolean>(false);

  const moveToEnd = (from: number) => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      const [movedCard] = newArray.splice(from, 1); // remove the card at the given index
      newArray.push(movedCard!); // add the removed card to the end of the array
      return newArray;
    });
    setAnswerShown(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-full flex items-center justify-center">
        <ul className="relative w-full max-w-xl h-[300px]">
          {cards.map((card, index) => {
            const canDrag = index === 0;
            return (
              <motion.li
                key={card.id}
                className="absolute w-full h-[300px] list-none"
                style={{
                  transformOrigin: "top center",
                  cursor: canDrag ? "grab" : "auto",
                }}
                animate={{
                  top: (index > MAX_STACK_SHOWN ? MAX_STACK_SHOWN : index) * -CARD_OFFSET,
                  scale: 1 - (index > MAX_STACK_SHOWN ? MAX_STACK_SHOWN + 1 : index) * SCALE_FACTOR,
                  zIndex: cards.length - index,
                }}
              // drag={canDrag ? "y" : false}
              // dragConstraints={{
              //   top: 0,
              //   bottom: 0
              // }}
              // whileDrag={{
              //   backgroundColor: "#00ff00"
              // }}
              // onDragEnd={() => moveToEnd(index)}
              >
                <div className="perspective-[1400px]">
                  <div
                    className={cn("relative transform duration-150 transform-style-3d", {
                      "rotate-y-180": index === 0 && answerShown
                    })}
                    onClick={() => {
                      if (index === 0) setAnswerShown((prev) => !prev);
                    }}
                  >
                    <Card
                      className="absolute w-full h-64 backface-hidden transform"
                    >
                      <CardContent className="pt-6 flex w-full h-full">
                        <div className="flex justify-center items-center h-full w-full">
                          <span className="text-xl text-center">
                            {cards[0]?.question}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className="absolute w-full h-64 backface-hidden transform rotate-y-180"
                    >
                      <CardContent className="pt-6 flex w-full h-full">
                        <div className="flex justify-center items-center h-full w-full">
                          <span className="text-base text-center">
                            {cards[0]?.answer}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className="flex w-full max-w-xl justify-between items-center">
        <div className="flex gap-3">
          <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>Edit Flashcards</Link>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-10 p-2 rounded-full -right-12 top-1/2"
            onClick={() => {
              moveToEnd(0);
            }}
          >
            <ArrowLeftIcon />
            <span className="sr-only">Previous flashcard</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-10 p-2 rounded-full -right-12 top-1/2"
            onClick={() => {
              moveToEnd(0);
            }}
          >
            <ArrowRightIcon />
            <span className="sr-only">Next flashcard</span>
          </Button>
        </div>
      </div>
    </div>

  );
};

