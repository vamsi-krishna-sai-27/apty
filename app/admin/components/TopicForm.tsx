export default function TopicForm({
  topicName,
  setTopicName,
  topicSlug,
  setTopicSlug,
  selectedCategory,
  setSelectedCategory,
  categories,
  handleTopicSave,
}: any) {
  return (
    <div className="border rounded-lg p-6 mt-10">

      <h2 className="text-2xl font-semibold mb-6">
        Add Topic
      </h2>

      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Topic Name"
          value={topicName}
          onChange={(e) =>
            setTopicName(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Topic Slug"
          value={topicSlug}
          onChange={(e) =>
            setTopicSlug(
              e.target.value
            )
          }
          className="border p-3 rounded"
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="border p-3 rounded"
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category: any) => (
              <option
                key={category.id}
                value={
                  category.slug
                }
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <button
          onClick={handleTopicSave}
          className="bg-blue-600 p-3 rounded"
        >
          Save Topic
        </button>

      </div>

    </div>
  );
}