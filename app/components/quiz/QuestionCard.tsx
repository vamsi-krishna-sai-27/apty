"use client";

import { Button } from "@/components/ui/button";

import {
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

export default function QuestionCard({
  current,
  currentQuestion,
  questions,
  answers,
  handleOptionSelect,
  bookmarkQuestion,
  bookmarkedQuestions,
}: any) {

  return (

    <div
      className="
        w-full

        min-h-full

        border
        rounded-2xl

        bg-background

        shadow-sm

        p-4
        sm:p-6

        flex
        flex-col
      "
    >

      {/* Header */}
      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-center
          sm:justify-between

          gap-4

          mb-6
        "
      >

        {/* Left */}
        <div>

          <p
            className="
              text-xs
              sm:text-sm

              text-muted-foreground

              mb-1
            "
          >

            Question {currentQuestion + 1} of{" "}
            {questions.length}

          </p>

          <h2
            className="
              text-xl
              sm:text-2xl

              font-bold
            "
          >

            Aptitude Quiz

          </h2>

        </div>

        {/* Bookmark */}
        <Button
          variant="outline"
          onClick={() =>
            bookmarkQuestion(
              current.id
            )
          }
          className="
            w-full
            sm:w-auto

            flex
            items-center
            gap-2
          "
        >

          {bookmarkedQuestions.includes(
            current.id
          ) ? (

            <BookmarkCheck
              className="
                w-4
                h-4

                fill-current
              "
            />

          ) : (

            <Bookmark
              className="
                w-4
                h-4
              "
            />

          )}

          Save

        </Button>

      </div>

      {/* Question */}
      <div className="mb-8">

        <p
          className="
            text-base
            sm:text-xl

            leading-7
            sm:leading-8

            font-medium

            break-words
          "
        >

          {current.question}

        </p>

      </div>

      {/* Options */}
      <div
        className="
          flex
          flex-col

          gap-3
          sm:gap-4
        "
      >

        {current.options.map(
          (
            option: string,
            index: number
          ) => (

            <Button
              key={index}
              variant={
                answers[current.id] ===
                index
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                handleOptionSelect(
                  index
                )
              }
              className="
                w-full

                justify-start

                h-auto

                py-4
                sm:py-5

                px-4
                sm:px-5

                rounded-xl

                whitespace-normal

                text-left

                text-sm
                sm:text-base

                leading-6

                break-words
              "
            >

              <span
                className="
                  font-bold

                  mr-2

                  shrink-0
                "
              >

                {String.fromCharCode(
                  65 + index
                )}
                .

              </span>

              <span className="break-words">

                {option}

              </span>

            </Button>
          )
        )}

      </div>

    </div>
  );
}