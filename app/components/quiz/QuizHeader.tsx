"use client";

import { Progress } from "@/components/ui/progress";

export default function QuizHeader({
  currentQuestion,
  totalQuestions,
  progress,
  timeLeft,
  formatTime,
}: any) {
  return (
    <div className="mb-6">

      <div className="flex justify-between items-center mb-3">
        <span>
          Question {currentQuestion + 1} of{" "}
          {totalQuestions}
        </span>

        <span className="font-bold text-red-500">
          ⏱ {formatTime(timeLeft)}
        </span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Progress</span>

        <span>
          {Math.round(progress)}%
        </span>
      </div>

      <Progress value={progress} />

    </div>
  );
}