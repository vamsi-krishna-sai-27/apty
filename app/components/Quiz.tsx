"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

const submitQuiz = () => {
    let score = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });

    localStorage.setItem(
      "reviewAnswers",
      JSON.stringify(answers)
    );

    localStorage.setItem(
      "reviewQuestions",
      JSON.stringify(questions)
    );

    localStorage.removeItem("timeLeft");

    router.push(
      `/result?score=${score}&total=${questions.length}`
    );
  };

  return (
    <div className="flex gap-8 w-full max-w-7xl">
      {/* Question Area */}
      <div className="flex-1 border rounded-lg p-6">
        
        {/* Progress Bar */}
        <div className="mb-6">
  <div className="flex justify-between items-center mb-3">
    <span>
      Question {currentQuestion + 1} of {questions.length}
    </span>

    <span className="font-bold text-red-500">
      ⏱ {formatTime(timeLeft)}
    </span>
  </div>

  <div className="flex justify-between mb-2">
    <span>Progress</span>
    <span>{Math.round(progress)}%</span>
  </div>

  <div className="w-full bg-zinc-700 rounded-full h-3">
    <div
      className="bg-green-600 h-3 rounded-full transition-all"
      style={{
        width: `${progress}%`,
      }}
    />
  </div>
</div>

        <h2 className="text-2xl font-bold mb-4">
          Question {currentQuestion + 1}
        </h2>

        <p className="mb-6 text-lg">
          {current.question}
        </p>

        <div className="flex flex-col gap-3">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`border rounded-lg p-3 text-left transition ${
                answers[current.id] === index
                  ? "bg-green-600"
                  : "hover:bg-zinc-800"
              }`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="border px-4 py-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <div className="w-48 border rounded-lg p-4">
        <h3 className="font-bold mb-4">
          Questions
        </h3>

        <div className="flex flex-wrap gap-2">
          {questions.map((question, index) => {
            let color = "bg-zinc-700";

            if (index === currentQuestion) {
              color = "bg-blue-600";
            } else if (
              answers[question.id] !== undefined
            ) {
              color = "bg-green-600";
            } else if (
              visited.has(question.id)
            ) {
              color = "bg-red-600";
            }

            return (
              <button
                key={question.id}
                onClick={() =>
                  goToQuestion(index)
                }
                className={`w-10 h-10 rounded text-white ${color}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}