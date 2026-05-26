"use client";

import { useEffect, useState } from "react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topicSlug: string;
};

export default function ReviewPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    const storedQuestions =
      localStorage.getItem("reviewQuestions");

    const storedAnswers =
      localStorage.getItem("reviewAnswers");

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        Review Answers
      </h1>

      <div className="space-y-8">
        {questions.map((question) => {
          const userAnswer =
            answers[question.id];

          const isCorrect =
            userAnswer === question.correctAnswer;

          return (
            <div
              key={question.id}
              className="border rounded-xl p-6"
            >
              <h2 className="font-semibold text-lg mb-4">
                {question.question}
              </h2>

              <div className="mb-3">
                <strong>Your Answer:</strong>{" "}
                {userAnswer !== undefined
                  ? question.options[userAnswer]
                  : "Not Answered"}

                <span
                  className={`ml-2 ${
                    isCorrect
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {isCorrect ? "✓" : "✗"}
                </span>
              </div>

              <div className="mb-3 text-green-500">
                <strong>Correct Answer:</strong>{" "}
                {
                  question.options[
                    question.correctAnswer
                  ]
                }
              </div>

              <div>
                <strong>Explanation:</strong>{" "}
                {question.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}