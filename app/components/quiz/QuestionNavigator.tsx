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
    <div className="w-48 border rounded-lg p-4">

      <h3 className="font-bold mb-4">
        Questions
      </h3>

      <div className="flex flex-wrap gap-2">

        {questions.map(
          (question: any, index: number) => (
            <Button
              key={question.id}
              variant={
                index === currentQuestion
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                goToQuestion(index)
              }
              className={`
                w-10 h-10 p-0
                ${
                  answers[
                    question.id
                  ] !== undefined
                    ? "border-green-900"
                    : ""
                }
              `}
            >
              {index + 1}
            </Button>
          )
        )}

      </div>

    </div>
  );
}