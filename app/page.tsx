"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { supabase } from "./lib/supabase";

import Navbar from "./components/Navbar";

import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchTopics();
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

    const updatedCategories = [];

    for (const category of data || []) {

      const { count: topicCount } =
        await supabase
          .from("topics")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq(
            "category_slug",
            category.slug
          );

      const { data: categoryTopics } =
        await supabase
          .from("topics")
          .select("slug")
          .eq(
            "category_slug",
            category.slug
          );

      const topicSlugs =
        categoryTopics?.map(
          (topic) => topic.slug
        ) || [];

let questionCount = 0;

for (const slug of topicSlugs) {
  const { count } = await supabase
    .from("questions")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("topic_slug", slug);

  questionCount += count || 0;
}

      updatedCategories.push({
        ...category,
        topicCount: topicCount || 0,
        questionCount,
      });
    }

    setCategories(updatedCategories);
    setLoading(false);
  };

  const fetchTopics = async () => {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .order("id");

    if (error) {
      console.log(error);
      return;
    }

    setTopics(data || []);
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

return (
  <main className="min-h-screen">

    {/* Navbar */}
    <Navbar />

    {/* Hero */}
    <section className="max-w-5xl mx-auto px-6 py-10 text-center">

      <h1 className="text-6xl font-bold mb-6">
        Practice Aptitude Smarter
      </h1>

      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
        Improve your aptitude skills
        with structured topics,
        quizzes, review
        explanations, and progress
        tracking.
      </p>

      <div className="flex justify-center gap-4">

        <Link href="/profile">
          <Button size="lg">
            View Profile
          </Button>
        </Link>

        <Link href="/category/aptitude">
          <Button
            variant="outline"
            size="lg"
          >
            Start Learning
          </Button>
        </Link>

      </div>

    </section>

    {/* Search */}
    <section className="max-w-2xl mx-auto px-6 mb-16">

      <Input
        placeholder="Search topics..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </section>

    {/* Search Results */}
    {search.trim() !== "" && (
      <section className="max-w-4xl mx-auto px-6 mb-16">

        <h2 className="text-2xl font-bold mb-6">
          Search Results
        </h2>

        <div className="grid gap-4">

          {filteredTopics.map(
            (topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer">

                  <CardContent className="p-5">

                    <h3 className="font-semibold">
                      {topic.name}
                    </h3>

                  </CardContent>

                </Card>
              </Link>
            )
          )}

          {filteredTopics.length ===
            0 && (
            <Card>
              <CardContent className="p-5">
                No topics found.
              </CardContent>
            </Card>
          )}

        </div>

      </section>
    )}

    {/* Categories */}
    {search.trim() === "" && (
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          Categories
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {loading
            ? Array.from({
                length: 6,
              }).map((_, index) => (
                <Card key={index}>

                  <CardContent className="p-6 space-y-4">

                    <Skeleton className="h-6 w-32" />

                    <Skeleton className="h-4 w-24" />

                    <Skeleton className="h-4 w-28" />

                    <Skeleton className="h-9 w-24 rounded-md" />

                  </CardContent>

                </Card>
              ))
            : categories.map(
                (category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                  >
                    <Card className="hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full">

                      <CardContent className="p-6">

                        <h3 className="text-xl font-bold mb-3">
                          {category.name}
                        </h3>

                        <p className="text-muted-foreground text-sm">
                          {
                            category.topicCount
                          }{" "}
                          Topics
                        </p>

                        <p className="text-muted-foreground text-sm">
                          {
                            category.questionCount
                          }{" "}
                          Questions
                        </p>

                        <div className="mt-6">
                          <Button size="sm">
                            Explore
                          </Button>
                        </div>

                      </CardContent>

                    </Card>
                  </Link>
                )
              )}

        </div>

      </section>
    )}

  </main>
);
}