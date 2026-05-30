"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/app/lib/supabase";

import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner";

import QuizHeader from "./quiz/QuizHeader";

import QuestionCard from "./quiz/QuestionCard";

import QuizActions from "./quiz/QuizActions";

import QuestionNavigator from "./quiz/QuestionNavigator";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topicSlug: string;
};

export default function Quiz({
  questions,
}: {
  questions: Question[];
}) {

  const router = useRouter();

  const [timeLeft, setTimeLeft] =
    useState(
      questions.length * 30
    );

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [answers, setAnswers] =
    useState<
      Record<number, number>
    >({});

  const [visited, setVisited] =
    useState<Set<number>>(
      new Set([0])
    );

  const [
    bookmarkedQuestions,
    setBookmarkedQuestions,
  ] = useState<number[]>([]);

  const current =
    questions[currentQuestion];

  // Load Saved Data
  useEffect(() => {

    const savedAnswers =
      localStorage.getItem(
        "answers"
      );

    const savedCurrentQuestion =
      localStorage.getItem(
        "currentQuestion"
      );

    const savedVisited =
      localStorage.getItem(
        "visited"
      );

    const savedTime =
      localStorage.getItem(
        "quizTimeLeft"
      );

    if (savedAnswers) {

      setAnswers(
        JSON.parse(savedAnswers)
      );
    }

    if (savedCurrentQuestion) {

      setCurrentQuestion(
        Number(
          savedCurrentQuestion
        )
      );
    }

    if (savedVisited) {

      setVisited(
        new Set(
          JSON.parse(
            savedVisited
          )
        )
      );
    }

    if (savedTime) {

      setTimeLeft(
        Number(savedTime)
      );
    }

  }, []);

  // Save Answers
  useEffect(() => {

    localStorage.setItem(
      "answers",
      JSON.stringify(answers)
    );

  }, [answers]);

  // Save Current Question
  useEffect(() => {

    localStorage.setItem(
      "currentQuestion",
      currentQuestion.toString()
    );

  }, [currentQuestion]);

  // Save Visited
  useEffect(() => {

    localStorage.setItem(
      "visited",
      JSON.stringify(
        Array.from(visited)
      )
    );

  }, [visited]);

  // Save Timer
  useEffect(() => {

    localStorage.setItem(
      "quizTimeLeft",
      timeLeft.toString()
    );

  }, [timeLeft]);

  // Timer
  useEffect(() => {

    if (timeLeft <= 0) {

      submitQuiz();

      return;
    }

    const timer =
      setTimeout(() => {

        setTimeLeft(
          prev => prev - 1
        );

      }, 1000);

    return () =>
      clearTimeout(timer);

  }, [timeLeft]);

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  // Select Answer
  const handleOptionSelect = (
    optionIndex: number
  ) => {

    setAnswers(prev => ({
      ...prev,
      [current.id]:
        optionIndex,
    }));
  };

  // Navigation
  const goToQuestion = (
    index: number
  ) => {

    setCurrentQuestion(index);

    setVisited(prev => {

      const updated =
        new Set(prev);

      updated.add(index);

      return updated;
    });
  };

  const nextQuestion = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      goToQuestion(
        currentQuestion + 1
      );
    }
  };

  const prevQuestion = () => {

    if (currentQuestion > 0) {

      goToQuestion(
        currentQuestion - 1
      );
    }
  };

  // Bookmark
  const bookmarkQuestion =
    async (
      questionId: number
    ) => {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        toast.error(
          "Login required"
        );

        return;
      }

      const { error } =
        await supabase
          .from("bookmarks")
          .insert([
            {
              user_id: user.id,
              question_id:
                questionId,
            },
          ]);

      if (error) {

        toast.error(
          error.message
        );

        return;
      }

      setBookmarkedQuestions(
        prev => [
          ...prev,
          questionId,
        ]
      );

      toast.success(
        "Question Saved"
      );
    };

  // Submit Quiz
  const submitQuiz =
    async () => {

      let score = 0;

      questions.forEach(
        question => {

          if (
            answers[
              question.id
            ] ===
            question.correctAnswer
          ) {

            score++;
          }
        }
      );

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (user) {

        await supabase
          .from(
            "quiz_attempts"
          )
          .insert([
            {
              user_id:
                user.id,

              score,

              total:
                questions.length,

              topic_slug:
                questions[0]
                  .topicSlug,
            },
          ]);
      }

      localStorage.setItem(
        "reviewAnswers",
        JSON.stringify(
          answers
        )
      );

      localStorage.setItem(
        "reviewQuestions",
        JSON.stringify(
          questions
        )
      );

      localStorage.removeItem(
        "quizTimeLeft"
      );

      router.push(
        `/result?score=${score}&total=${questions.length}`
      );
    };

  return (

    <div
      className="
        w-full
        max-w-7xl
        mx-auto

        p-2
        sm:p-4

        min-h-screen

        bg-background
      "
    >

      <div
        className="
          flex
          flex-col
          xl:flex-row

          gap-4
          lg:gap-6

          h-full
        "
      >

        {/* Quiz Section */}
        <Card
          className="
            flex-1

            min-w-0

            bg-background

            border

            overflow-hidden
          "
        >

          <CardContent
            className="
              p-3
              sm:p-4
              lg:p-6

              flex
              flex-col

              gap-4

              bg-background
            "
          >

            {/* Header */}
            <QuizHeader
              currentQuestion={
                currentQuestion
              }
              totalQuestions={
                questions.length
              }
              progress={progress}
              timeLeft={timeLeft}
            />

            {/* Question */}
            <div
              className="
                bg-background

                rounded-2xl
              "
            >

              <QuestionCard
                current={current}
                currentQuestion={
                  currentQuestion
                }
                questions={
                  questions
                }
                answers={answers}
                handleOptionSelect={
                  handleOptionSelect
                }
                bookmarkQuestion={
                  bookmarkQuestion
                }
                bookmarkedQuestions={
                  bookmarkedQuestions
                }
              />

            </div>

            {/* Actions */}
            <QuizActions
              currentQuestion={
                currentQuestion
              }
              totalQuestions={
                questions.length
              }
              prevQuestion={
                prevQuestion
              }
              nextQuestion={
                nextQuestion
              }
              submitQuiz={
                submitQuiz
              }
            />

          </CardContent>

        </Card>

        {/* Navigator */}
        <div
          className="
            w-full
            xl:w-[320px]

            shrink-0
          "
        >

          <QuestionNavigator
            questions={questions}
            currentQuestion={
              currentQuestion
            }
            answers={answers}
            visited={Array.from(
              visited
            )}
            goToQuestion={
              goToQuestion
            }
          />

        </div>

      </div>

    </div>
  );
}