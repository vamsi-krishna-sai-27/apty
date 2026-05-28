export default function CategoryForm({
  name,
  setName,
  slug,
  setSlug,
  handleSave,
}: any) {
  return (
    <div className="border rounded-lg p-6 mb-10">

      <h2 className="text-2xl font-semibold mb-6">
        Add Category
      </h2>

      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
          className="border p-3 rounded"
        />

        <button
          onClick={handleSave}
          className="bg-green-600 p-3 rounded"
        >
          Save Category
        </button>

      </div>

    </div>
  );
}