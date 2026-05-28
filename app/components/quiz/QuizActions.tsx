"use client";

import { Button } from "@/components/ui/button";

export default function QuizActions({
  currentQuestion,
  totalQuestions,
  prevQuestion,
  nextQuestion,
  submitQuiz,
}: any) {
  return (
    <div className="flex justify-between mt-8">

      <Button
        variant="outline"
        onClick={prevQuestion}
        disabled={currentQuestion === 0}
      >
        Prev
      </Button>

      {currentQuestion ===
      totalQuestions - 1 ? (
        <Button onClick={submitQuiz}>
          Submit
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={nextQuestion}
        >
          Next
        </Button>
      )}

    </div>
  );
}