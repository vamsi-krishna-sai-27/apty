"use client";

import { useState } from "react";

import { supabase } from "@/app/lib/supabase";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Turnstile } from "@marsidev/react-turnstile";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [token, setToken] =
    useState("");

  const handleLogin = async () => {

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

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login Success");

    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <Card className="w-full max-w-md">

        <CardContent className="p-6">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Login
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
              onClick={handleLogin}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : "Login"}
            </Button>
                <p className="text-sm text-center text-muted-foreground">

  Don't have an account?{" "}

  <Link
    href="/signup"
    className="text-primary hover:underline"
  >
    Sign Up
  </Link>

</p>
          </div>

        </CardContent>

      </Card>

    </main>
  );
}