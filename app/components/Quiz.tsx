"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
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
  
  const [timeLeft, setTimeLeft] = useState(1 * 60);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<number, number>>({});

  const [visited, setVisited] = useState<Set<number>>(
    new Set([questions[0].id])
  );
  const [
  bookmarkedQuestions,
  setBookmarkedQuestions,
] = useState<number[]>([]);
  // Load saved data
  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers");
    const savedCurrentQuestion = localStorage.getItem("currentQuestion");
    const savedVisited = localStorage.getItem("visited");

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    if (savedCurrentQuestion) {
      setCurrentQuestion(Number(savedCurrentQuestion));
    }

    if (savedVisited) {
      setVisited(new Set(JSON.parse(savedVisited)));
    }
  }, []);

  // Save answers
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  // Save current question
  useEffect(() => {
    localStorage.setItem(
      "currentQuestion",
      currentQuestion.toString()
    );
  }, [currentQuestion]);

  // Save visited questions
  useEffect(() => {
    localStorage.setItem(
      "visited",
      JSON.stringify(Array.from(visited))
    );
  }, [visited]);

  const current = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: optionIndex,
    }));
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);

    setVisited((prev) => {
      const newVisited = new Set(prev);
      newVisited.add(questions[index].id);
      return newVisited;
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      goToQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};
useEffect(() => {
  if (timeLeft <= 0) {
    submitQuiz();
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

useEffect(() => {
  const savedTime = localStorage.getItem("timeLeft");

  if (savedTime) {
    setTimeLeft(Number(savedTime));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "timeLeft",
    timeLeft.toString()
  );
}, [timeLeft]);

const bookmarkQuestion = async (
  questionId: number
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("USER:", user);

  if (!user) {
    console.log("NO USER FOUND");
    return;
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([
      {
        user_id: user.id,
        question_id: questionId,
      },
    ])
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    toast.error(error.message);
    return;
  }
  setBookmarkedQuestions((prev) => [
  ...prev,
  questionId,
]);
  toast.success("Question Saved");
};

const submitQuiz = async () => {
  let score = 0;

  questions.forEach((question) => {
    if (
      answers[question.id] ===
      question.correctAnswer
    ) {
      score++;
    }
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from("quiz_attempts")
      .insert([
        {
          user_id: user.id,
          score,
          total: questions.length,
          topic_slug:
            questions[0].topicSlug,
        },
      ]);
  }

  localStorage.setItem(
    "reviewAnswers",
    JSON.stringify(answers)
  );

  localStorage.setItem(
    "reviewQuestions",
    JSON.stringify(questions)
  );

  router.push(
    `/result?score=${score}&total=${questions.length}`
  );
};

return (
  <div className="flex gap-8 w-full max-w-7xl">

    {/* Question Area */}
    <Card className="flex-1">

      <CardContent className="p-6">

        <QuizHeader
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          progress={progress}
          timeLeft={timeLeft}
          formatTime={formatTime}
        />

        <QuestionCard
          current={current}
          currentQuestion={currentQuestion}
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

        <QuizActions
          currentQuestion={
            currentQuestion
          }
          totalQuestions={
            questions.length
          }
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          submitQuiz={submitQuiz}
        />

      </CardContent>

    </Card>

    {/* Navigator */}
    <QuestionNavigator
      questions={questions}
      currentQuestion={currentQuestion}
      answers={answers}
      visited={visited}
      goToQuestion={goToQuestion}
    />

  </div>
);
}