"use client";

import { useState } from "react";
import Link from "next/link";
import { categories } from "./data/categories";
import { topics } from "./data/topics";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen flex flex-col items-center py-20">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl">AptiTrack</h1>

        <p className="text-sm text-center font-light max-w-[600px] mt-2">
          Practice aptitude and reasoning questions, track your progress, and
          prepare smarter.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-md mt-8">
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 bg-transparent outline-none"
        />
      </div>

      {/* Search Results */}
      {search.trim() !== "" && (
        <div className="w-full max-w-2xl mt-8 px-4">
          <h2 className="font-semibold text-xl mb-4">
            Search Results
          </h2>

          <div className="flex flex-col gap-3">
            {filteredTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="border p-4 rounded-lg hover:bg-zinc-800 transition"
              >
                <div className="font-semibold">
                  {topic.name}
                </div>

                <div className="text-sm text-zinc-400">
                  {topic.questions} Questions
                </div>
              </Link>
            ))}

            {filteredTopics.length === 0 && (
              <div className="border p-4 rounded-lg">
                No topics found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category Cards */}
      {search.trim() === "" && (
        <div className="flex justify-center flex-wrap gap-10 mt-10 px-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
            >
              <div className="flex flex-col border p-4 hover:cursor-pointer hover:bg-zinc-800 hover:scale-105 transition-all rounded-lg">
                <div className="font-semibold">
                  {category.name}
                </div>

                <div>
                  {category.questions} Questions
                </div>

                <div>
                  {category.topics} Topics
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}