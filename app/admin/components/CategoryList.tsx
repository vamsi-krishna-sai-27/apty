export default function CategoryList({
  categories,
  deleteCategory,
}: any) {
  return (
    <div className="py-10">

      <h2 className="text-2xl font-semibold mb-4">
        Categories
      </h2>

      <div className="flex flex-col gap-3">

        {categories.map((category: any) => (
          <div
            key={category.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>

              <div className="font-semibold">
                {category.name}
              </div>

              <div className="text-sm text-zinc-400">
                {category.slug}
              </div>

            </div>

            <button
              onClick={() =>
                deleteCategory(
                  category.id
                )
              }
              className="bg-red-600 px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}