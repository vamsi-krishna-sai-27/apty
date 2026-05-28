"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Link from "next/link";

import { supabase } from "@/app/lib/supabase";

import { Card, CardContent } from "@/components/ui/card";

import Navbar from "@/app/components/Navbar";
export default function CategoryPage() {
  const params = useParams();

  const slug = params.slug as string;

  const [topics, setTopics] = useState<any[]>([]);
  const [questionCounts, setQuestionCounts] =
    useState<Record<string, number>>({});

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const { data } = await supabase
      .from("topics")
      .select("*")
      .eq("category_slug", slug);

    setTopics(data || []);

    if (!data) return;

    const counts: Record<string, number> =
      {};

    for (const topic of data) {
      const { count } = await supabase
        .from("questions")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("topic_slug", topic.slug);

      counts[topic.slug] = count || 0;
    }

    setQuestionCounts(counts);
  };

  return (<>
  <Navbar/>
    <main className="min-h-screen max-w-6xl mx-auto py-10 px-4">
      
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {slug.charAt(0).toUpperCase() +
            slug.slice(1)}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.slug}`}
          >
            <Card className="hover:scale-[1.02] transition-all cursor-pointer">

              <CardContent className="p-5">

                <h2 className="font-semibold text-lg mb-3">
                  {topic.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {
                    questionCounts[
                      topic.slug
                    ] || 0
                  }{" "}
                  Questions
                </p>

              </CardContent>

            </Card>
          </Link>
        ))}

      </div>
    </main>
  
  </>
  );
}