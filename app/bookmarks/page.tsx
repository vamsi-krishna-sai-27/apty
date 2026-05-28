"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import Navbar from "../components/Navbar";

export default function BookmarksPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: bookmarks } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id);

    if (!bookmarks || bookmarks.length === 0) {
      setLoading(false);
      return;
    }

    const questionIds = bookmarks.map(
      (bookmark) => bookmark.question_id
    );

    const { data: questionsData } =
      await supabase
        .from("questions")
        .select("*")
        .in("id", questionIds);

    setQuestions(questionsData || []);
    setLoading(false);
  };

  const removeBookmark = async (
    questionId: number
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user.id)
      .eq("question_id", questionId);

    setQuestions((prev) =>
      prev.filter((q) => q.id !== questionId)
    );
  };

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto p-8">
        Loading...
      </main>
    );
  }

  return (
    <>
    <Navbar/>
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
          <div className="flex items-center gap-3 mb-8">

            <Bookmark className="w-8 h-8 fill-current" />

            <h1 className="text-4xl font-bold">
              Bookmarked Questions
            </h1>

          </div>
      </h1>

      <div className="space-y-4">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardContent className="p-6">

              <div className="flex justify-between items-start gap-4">

                <div>
                  <h2 className="font-semibold text-lg mb-3">
                    {question.question}
                  </h2>

                  <div className="space-y-1 text-sm">
                    <p>
                      A. {question.option_a}
                    </p>

                    <p>
                      B. {question.option_b}
                    </p>

                    <p>
                      C. {question.option_c}
                    </p>

                    <p>
                      D. {question.option_d}
                    </p>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    Topic: {question.topic_slug}
                  </p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() =>
                    removeBookmark(
                      question.id
                    )
                  }
                >
                  Remove
                </Button>

              </div>

            </CardContent>
          </Card>
        ))}

        {questions.length === 0 && (
          <Card>
            <CardContent className="p-6">
              No bookmarked questions found.
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  
  </>);
}