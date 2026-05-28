export default function TopicList({
  topics,
  questionsList,
  deleteTopic,
}: any) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-semibold mb-4">
        Topics
      </h2>

      <div className="flex flex-col gap-3">

        {topics.map((topic: any) => {

          const questionCount =
            questionsList.filter(
              (question: any) =>
                question.topic_slug ===
                topic.slug
            ).length;

          return (
            <div
              key={topic.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>

                <div className="font-semibold">
                  {topic.name}
                </div>

                <div className="text-sm text-zinc-400">
                  Category:{" "}
                  {
                    topic.category_slug
                  }
                </div>

                <div className="text-sm text-green-500">
                  Questions:{" "}
                  {questionCount}
                </div>

              </div>

              <button
                onClick={() =>
                  deleteTopic(
                    topic.id
                  )
                }
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}