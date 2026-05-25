import { questions } from "@/app/data/questions";
import { notFound } from "next/navigation";
import Quiz from "@/app/components/Quiz";
export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filterQuestions=questions.filter(
    (question)=> question.topicSlug==slug
  )

  if (filterQuestions.length === 0) {
    notFound();
  }

  return (
    <main className=" min-h-screen flex flex-col items-center py-10">
              <div className="flex flex-col items-center mb-10">
                <h1 className="font-bold text-4xl">{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>
              </div>
              <Quiz questions={filterQuestions} />
    </main>
  );

}