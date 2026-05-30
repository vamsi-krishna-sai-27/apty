"use client";

import { Progress } from "@/components/ui/progress";

import {
  Clock3,
  CircleCheckBig,
} from "lucide-react";

export default function QuizHeader({
  currentQuestion,
  totalQuestions,
  progress,
  timeLeft,
}: any) {

  const formatTime = (
    seconds: number
  ) => {

    const mins = Math.floor(
      seconds / 60
    );

    const secs =
      seconds % 60;

    return `${mins
      .toString()
      .padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (

    <div
      className="
        border
        rounded-2xl
        p-4
        sm:p-6

        shadow-sm

        mb-4
        sm:mb-6

        bg-background
      "
    >

      {/* Top Header */}
      <div
        className="
          flex
          flex-col
          md:flex-row

          md:items-center
          md:justify-between

          gap-4

          mb-5
        "
      >

        {/* Left */}
        <div className="min-w-0">

          <p
            className="
              text-xs
              sm:text-sm

              text-muted-foreground

              mb-1
            "
          >

            Aptitude Quiz

          </p>

          <h2
            className="
              text-lg
              sm:text-2xl

              font-bold

              leading-tight

              break-words
            "
          >

            Question{" "}

            {currentQuestion + 1}

            {" "}of{" "}

            {totalQuestions}

          </h2>

        </div>

        {/* Timer */}
        <div
          className="
            flex
            items-center
            justify-center

            gap-2
            sm:gap-3

            bg-red-100
            dark:bg-red-950

            text-red-600
            dark:text-red-400

            px-4
            sm:px-5

            py-2.5
            sm:py-3

            rounded-xl

            w-full
            sm:w-fit

            shrink-0
          "
        >

          <Clock3
            className="
              w-4 h-4
              sm:w-5 sm:h-5
              shrink-0
            "
          />

          <span
            className="
              font-bold

              text-base
              sm:text-lg
            "
          >

            {formatTime(timeLeft)}

          </span>

        </div>

      </div>

      {/* Progress Labels */}
      <div
        className="
          flex
          items-center
          justify-between

          gap-3

          mb-3
        "
      >

        <div
          className="
            flex
            items-center

            gap-2

            text-xs
            sm:text-sm

            font-medium
          "
        >

          <CircleCheckBig
            className="
              w-4 h-4
              text-green-500
              shrink-0
            "
          />

          <span className="truncate">

            Quiz Progress

          </span>

        </div>

        <span
          className="
            text-xs
            sm:text-sm

            font-bold

            shrink-0
          "
        >

          {Math.round(progress)}%

        </span>

      </div>

      {/* Progress Bar */}
      <Progress
        value={progress}
        className="
          h-2.5
          sm:h-3

          rounded-full
        "
      />

    </div>
  );
}