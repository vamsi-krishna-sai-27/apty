import { notFound } from "next/navigation";
import Quiz from "@/app/components/Quiz";
import { supabase } from "@/app/lib/supabase";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: questions, error } =
    await supabase
      .from("questions")
      .select("*")
      .eq("topic_slug", slug);

  if (error) {
    console.log(error);
  }

  if (!questions || questions.length === 0) {
    notFound();
  }

  const formattedQuestions = questions.map(
    (question) => ({
      id: question.id,
      question: question.question,

      options: [
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
      ],

      correctAnswer:
        question.correct_answer,

      explanation:
        question.explanation,

      topicSlug:
        question.topic_slug,
    })
  );

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-10">
        {slug
          .split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() +
              word.slice(1)
          )
          .join(" ")}
      </h1>

      <Quiz
        questions={formattedQuestions}
      />
    </main>
  );
}