"use client";

import { useState } from "react";
import { supabase} from "../lib/supabase";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  
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
};

  return (
    <main className="min-h-screen max-w-2xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="border rounded-lg p-6">
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
    </main>
  );
}