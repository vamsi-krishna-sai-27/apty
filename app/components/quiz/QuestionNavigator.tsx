"use client";

import { Button } from "@/components/ui/button";

export default function QuestionNavigator({
  questions,
  currentQuestion,
  answers,
  visited,
  goToQuestion,
}: any) {

  return (

    <div
      className="
        w-full
        lg:w-72
        border
        rounded-2xl
        shadow-sm
        bg-background

        h-auto
        lg:h-[calc(100vh-32px)]

        flex
        flex-col

        overflow-hidden
      "
    >

      {/* Header */}
      <div
        className="
          p-4
          sm:p-5
          border-b
          shrink-0
        "
      >

        <h3
          className="
            text-lg
            sm:text-xl
            font-bold
            mb-1
          "
        >
          Question Navigator
        </h3>

        <p
          className="
            text-xs
            sm:text-sm
            text-muted-foreground
          "
        >
          Jump between questions
        </p>

      </div>

      {/* Scrollable Content */}
      <div
        className="
          flex-1
          overflow-y-auto

          p-4
          sm:p-5
        "
      >

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-2
            gap-3
            mb-6
          "
        >

          {/* Answered */}
          <div
            className="
              border
              rounded-xl
              p-3
              text-center
            "
          >

            <p
              className="
                text-xs
                sm:text-sm
                text-muted-foreground
              "
            >
              Answered
            </p>

            <p
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-green-500
              "
            >

              {
                Object.keys(
                  answers
                ).length
              }

            </p>

          </div>

          {/* Remaining */}
          <div
            className="
              border
              rounded-xl
              p-3
              text-center
            "
          >

            <p
              className="
                text-xs
                sm:text-sm
                text-muted-foreground
              "
            >
              Remaining
            </p>

            <p
              className="
                text-xl
                sm:text-2xl
                font-bold
                text-red-500
              "
            >

              {questions.length -
                Object.keys(
                  answers
                ).length}

            </p>

          </div>

        </div>

        {/* Question Buttons */}
        <div
          className="
            grid
            grid-cols-4
            sm:grid-cols-5
            lg:grid-cols-5
            gap-2
            sm:gap-3
          "
        >

          {questions.map(
            (
              question: any,
              index: number
            ) => {

              const isCurrent =
                index === currentQuestion;

              const isAnswered =
                answers[
                  question.id
                ] !== undefined;

              const isVisited =
                visited.includes(index);

              return (

                <Button
                  key={question.id}
                  variant={
                    isCurrent
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    goToQuestion(index)
                  }
                  className={`
                    w-full
                    aspect-square

                    p-0

                    rounded-xl

                    text-sm
                    sm:text-base

                    font-semibold

                    transition-all

                    shrink-0

                    ${
                      isAnswered
                        ? "border-green-500 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950 dark:text-green-400"
                        : ""
                    }

                    ${
                      isVisited &&
                      !isAnswered
                        ? "border-yellow-500 bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                        : ""
                    }

                    ${
                      isCurrent
                        ? "!bg-primary !text-primary-foreground scale-105"
                        : ""
                    }
                  `}
                >

                  {index + 1}

                </Button>
              );
            }
          )}

        </div>

        {/* Legend */}
        <div
          className="
            mt-8
            space-y-3

            text-xs
            sm:text-sm
          "
        >

          <div className="flex items-center gap-2">

            <div
              className="
                w-3
                h-3
                sm:w-4
                sm:h-4
                rounded
                bg-primary
              "
            />

            <span>
              Current Question
            </span>

          </div>

          <div className="flex items-center gap-2">

            <div
              className="
                w-3
                h-3
                sm:w-4
                sm:h-4
                rounded
                bg-green-500
              "
            />

            <span>
              Answered
            </span>

          </div>

          <div className="flex items-center gap-2">

            <div
              className="
                w-3
                h-3
                sm:w-4
                sm:h-4
                rounded
                bg-yellow-500
              "
            />

            <span>
              Visited
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}