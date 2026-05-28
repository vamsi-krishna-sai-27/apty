"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

import ThemeToggle from "./ThemeToggle";

import { Button } from "@/components/ui/button";

export default function Navbar() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  const logout = async () => {

    await supabase.auth.signOut();

    setUser(null);

    router.push("/login");
  };

  return (
    <nav className="border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/">

          <h1 className="text-2xl font-bold cursor-pointer">
            AptiTrack
          </h1>

        </Link>

        <div className="flex items-center gap-3">

          <Link href="/">
            <Button variant="ghost">
              Home
            </Button>
          </Link>

          {user ? (
            <>

              <Link href="/profile">
                <Button variant="ghost">
                  Profile
                </Button>
              </Link>

              <Link href="/bookmarks">
                <Button variant="ghost">
                  Bookmarks
                </Button>
              </Link>

              <Button
                variant="destructive"
                onClick={logout}
              >
                Logout
              </Button>

            </>
          ) : (
            <>

              <Link href="/login">
                <Button variant="ghost">
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button>
                  Sign Up
                </Button>
              </Link>

            </>
          )}

          <ThemeToggle />

        </div>

      </div>

    </nav>
  );
}