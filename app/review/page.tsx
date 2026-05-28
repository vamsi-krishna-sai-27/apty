"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <main className="min-h-screen max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Review Answers
      </h1>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer =
            answers[question.id];

          const isCorrect =
            userAnswer ===
            question.correctAnswer;

          return (
            <Card key={question.id}>
              <CardContent className="p-6">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Question {index + 1}
                  </h2>

                  {isCorrect ? (
                    <Badge>
                      Correct
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      Incorrect
                    </Badge>
                  )}
                </div>

                <p className="text-lg mb-6">
                  {question.question}
                </p>

                <div className="space-y-3">

                  <div className="border rounded-lg p-4">
                    <p className="font-semibold mb-1">
                      Your Answer
                    </p>

                    <p>
                      {userAnswer !== undefined
                        ? question.options[
                            userAnswer
                          ]
                        : "Not Answered"}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="font-semibold mb-1 text-green-600">
                      Correct Answer
                    </p>

                    <p>
                      {
                        question.options[
                          question.correctAnswer
                        ]
                      }
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <p className="font-semibold mb-2">
                      Explanation
                    </p>

                    <p>
                      {question.explanation}
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}