"use client";

import { useState } from "react";

import Link from "next/link";

import { supabase } from "@/app/lib/supabase";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Turnstile } from "@marsidev/react-turnstile";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function SignupPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [token, setToken] =
    useState("");

  const signup = async () => {

    if (!token) {
      toast.error(
        "Verify you are human"
      );

      return;
    }

    if (!email || !password) {
      toast.error(
        "Fill all fields"
      );

      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    setLoading(false);

    console.log(data);
    console.log(error);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Account Created"
    );

    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <Card className="w-full max-w-md">

        <CardContent className="p-8">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Sign Up
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

            <div className="flex ">

              <Turnstile
                siteKey={
                  process.env
                    .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                }
                onSuccess={(token) =>
                  setToken(token)
                }
              />

            </div>

            <Button
              onClick={signup}
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </Button>
                <p className="text-sm text-center text-muted-foreground">

                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="text-primary hover:underline"
                  >
                    Login
                  </Link>

                </p>
          </div>

        </CardContent>

      </Card>

    </main>
  );
}