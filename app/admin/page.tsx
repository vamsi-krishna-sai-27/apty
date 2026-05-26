"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data || []);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("categories")
      .insert([
        {
          name,
          slug,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Category Added");

    setName("");
    setSlug("");

    fetchCategories();
  };

const deleteCategory = async (id: number) => {
  console.log("Deleting:", id);

  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .select();

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  fetchCategories();
};

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Add Category Form */}
      <div className="border rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Add Category
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
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

      {/* Categories List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Categories
        </h2>

        <div className="flex flex-col gap-3">
          {categories.map((category) => (
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
                onClick={() => deleteCategory(category.id)}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="border p-4 rounded-lg">
              No categories found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}