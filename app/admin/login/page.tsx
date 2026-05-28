
"use client";

import { useState } from "react";

import { supabase } from "@/app/lib/supabase";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const login = async () => {

    if (!email || !password) {

      toast.error(
        "Fill all fields"
      );

      return;
    }

    setLoading(true);

    // LOGIN USER

    const {
      data,
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // INVALID EMAIL/PASSWORD

    if (error) {

      setLoading(false);

      toast.error(
        "Invalid Credentials"
      );

      return;
    }

    // CHECK ADMIN ROLE

   const user = data.user;

console.log("USER ID:", user.id);

const {
  data: profile,
  error: profileError,
} = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .single();

console.log("PROFILE:", profile);

console.log(
  "PROFILE ERROR:",
  profileError
);
    // NOT ADMIN

    if (
      profileError ||
      profile?.role !== "admin"
    ) {

      await supabase.auth.signOut();

      setLoading(false);

      toast.error(
        "Invalid Admin Credentials"
      );

      return;
    }

    setLoading(false);

    toast.success(
      "Admin Login Successful"
    );

    router.push("/admin");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <Card className="w-full max-w-md">

        <CardContent className="p-8">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Admin Login
          </h1>

          <div className="flex flex-col gap-4">

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <Button
              onClick={login}
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

          </div>

        </CardContent>

      </Card>

    </main>
  );
}

