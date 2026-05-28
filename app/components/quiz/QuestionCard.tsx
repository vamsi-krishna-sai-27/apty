"use client";

import { Button } from "@/components/ui/button";

import {
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

export default function QuestionCard({
  current,
  currentQuestion,
  answers,
  handleOptionSelect,
  bookmarkQuestion,
  bookmarkedQuestions,
}: any) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Question {currentQuestion + 1}
        </h2>

        <Button
          variant="outline"
          onClick={() =>
            bookmarkQuestion(current.id)
          }
          className="flex items-center gap-2"
        >
          {bookmarkedQuestions.includes(
            current.id
          ) ? (
            <BookmarkCheck className="w-4 h-4 fill-current" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}

          Save
        </Button>

      </div>

      <p className="mb-6 text-lg">
        {current.question}
      </p>

      <div className="flex flex-col gap-3">

        {current.options.map(
          (option: string, index: number) => (
            <Button
              key={index}
              variant={
                answers[current.id] ===
                index
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                handleOptionSelect(index)
              }
              className="justify-start h-auto py-4 w-full"
            >
              {String.fromCharCode(
                65 + index
              )}
              . {option}
            </Button>
          )
        )}

      </div>
    </>
  );
}