"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

import { Card, CardContent } from "@/components/ui/card";

export default function AnalyticsPage() {
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from("quiz_attempts")
      .select("*");

    setAttempts(data || []);
  };

  const totalAttempts = attempts.length;

  const averageScore =
    attempts.length > 0
      ? (
          attempts.reduce(
            (sum, attempt) =>
              sum +
              (attempt.score / attempt.total) *
                100,
            0
          ) / attempts.length
        ).toFixed(1)
      : 0;

  const topicCounts: Record<
    string,
    number
  > = {};

  attempts.forEach((attempt) => {
    topicCounts[attempt.topic_slug] =
      (topicCounts[attempt.topic_slug] || 0) +
      1;
  });

  const mostPopularTopic =
    Object.keys(topicCounts).length > 0
      ? Object.entries(topicCounts).sort(
          (a, b) => b[1] - a[1]
        )[0][0]
      : "None";
      const uniqueUsers = new Set(
  attempts.map((a) => a.user_id)
);

const totalUsers = uniqueUsers.size;

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-4">

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Quiz Attempts
            </p>

            <h2 className="text-4xl font-bold">
              {totalAttempts}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Average Score
            </p>

            <h2 className="text-4xl font-bold">
              {averageScore}%
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Popular Topic
            </p>

            <h2 className="text-2xl font-bold">
              {mostPopularTopic}
            </h2>
          </CardContent>
        </Card>
        <Card>
  <CardContent className="p-6">
    <p className="text-sm text-muted-foreground">
      Active Users
    </p>

    <h2 className="text-4xl font-bold">
      {totalUsers}
    </h2>
  </CardContent>
</Card>
      </div>
    </main>
  );
}