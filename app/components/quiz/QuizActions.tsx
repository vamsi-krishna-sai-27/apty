"use client";

import { Button } from "@/components/ui/button";

import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function QuizActions({
  currentQuestion,
  totalQuestions,
  prevQuestion,
  nextQuestion,
  submitQuiz,
}: any) {

  const isLastQuestion =
    currentQuestion ===
    totalQuestions - 1;

  return (

    <div
      className="
        mt-6
        sm:mt-8

        flex
        flex-col
        sm:flex-row

        items-stretch
        sm:items-center

        justify-between

        gap-4

        border-t
        pt-4
      "
    >

      {/* Previous */}
      <Button
        variant="outline"
        onClick={prevQuestion}
        disabled={currentQuestion === 0}
        className="
          w-full
          sm:w-auto

          flex
          items-center
          justify-center

          gap-2

          px-4
          sm:px-6

          h-11
        "
      >

        <ChevronLeft className="w-4 h-4 shrink-0" />

        <span className="text-sm sm:text-base">

          Previous

        </span>

      </Button>

      {/* Counter */}
      <div
        className="
          order-first
          sm:order-none

          text-center

          text-xs
          sm:text-sm

          text-muted-foreground
          font-medium
        "
      >

        Question{" "}

        <span className="font-bold text-foreground">

          {currentQuestion + 1}

        </span>

        {" "}of{" "}

        <span className="font-bold text-foreground">

          {totalQuestions}

        </span>

      </div>

      {/* Next / Submit */}
      {isLastQuestion ? (

        <Button
          onClick={submitQuiz}
          className="
            w-full
            sm:w-auto

            flex
            items-center
            justify-center

            gap-2

            px-4
            sm:px-6

            h-11

            bg-green-600
            hover:bg-green-700
          "
        >

          <CheckCircle className="w-4 h-4 shrink-0" />

          <span className="text-sm sm:text-base">

            Submit Quiz

          </span>

        </Button>

      ) : (

        <Button
          variant="default"
          onClick={nextQuestion}
          className="
            w-full
            sm:w-auto

            flex
            items-center
            justify-center

            gap-2

            px-4
            sm:px-6

            h-11
          "
        >

          <span className="text-sm sm:text-base">

            Next

          </span>

          <ChevronRight className="w-4 h-4 shrink-0" />

        </Button>

      )}

    </div>
  );
}