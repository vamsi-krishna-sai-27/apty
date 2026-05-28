"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    const { data } = await supabase
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setAttempts(data || []);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const totalAttempts = attempts.length;

  const bestScore =
    attempts.length > 0
      ? Math.max(
          ...attempts.map(
            (a) =>
              (a.score / a.total) * 100
          )
        )
      : 0;

  const averageScore =
    attempts.length > 0
      ? (
          attempts.reduce(
            (sum, a) =>
              sum +
              (a.score / a.total) * 100,
            0
          ) / attempts.length
        ).toFixed(1)
      : 0;

  return (
    <>
    <Navbar/>
    <main className="min-h-screen max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Profile
        </h1>

        <Button
          variant="destructive"
          onClick={logout}
        >
          Logout
        </Button>
      </div>

      {/* User Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">
            User Information
          </h2>

          <p>{user?.email}</p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Attempts
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {totalAttempts}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Best Score
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {bestScore.toFixed(0)}%
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Average Score
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {averageScore}%
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Quiz History
        </h2>

        <div className="space-y-4">
          {attempts.map((attempt) => (
            <Card key={attempt.id}>
              <CardContent className="p-5">

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {attempt.topic_slug}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(
                        attempt.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <Badge>
                    {attempt.score}/
                    {attempt.total}
                  </Badge>
                </div>

              </CardContent>
            </Card>
          ))}

          {attempts.length === 0 && (
            <Card>
              <CardContent className="p-5">
                No quiz attempts yet.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
    </>
  );
}