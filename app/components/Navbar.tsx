"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";

import { supabase } from "../lib/supabase";

import ThemeToggle from "./ThemeToggle";

import { Button } from "@/components/ui/button";

export default function Navbar() {

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [mobileMenu, setMobileMenu] =
    useState(false);

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

    <nav className="border-b bg-background sticky top-0 z-50">

      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6

          py-4

          flex
          items-center
          justify-between
        "
      >

        {/* Logo */}
        <Link href="/">

          <h1
            className="
              text-xl
              sm:text-2xl

              font-bold

              cursor-pointer
            "
          >

            AptiTrack

          </h1>

        </Link>

        {/* Desktop Menu */}
        <div
          className="
            hidden
            md:flex

            items-center
            gap-3
          "
        >

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

        {/* Mobile Right */}
        <div
          className="
            flex
            md:hidden

            items-center
            gap-2
          "
        >

          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
          >

            {mobileMenu ? (

              <X className="w-5 h-5" />

            ) : (

              <Menu className="w-5 h-5" />

            )}

          </Button>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (

        <div
          className="
            md:hidden

            border-t

            px-4
            py-4

            flex
            flex-col

            gap-3

            bg-background
          "
        >

          <Link
            href="/"
            onClick={() =>
              setMobileMenu(false)
            }
          >

            <Button
              variant="ghost"
              className="w-full justify-start"
            >

              Home

            </Button>

          </Link>

          {user ? (

            <>

              <Link
                href="/profile"
                onClick={() =>
                  setMobileMenu(false)
                }
              >

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >

                  Profile

                </Button>

              </Link>

              <Link
                href="/bookmarks"
                onClick={() =>
                  setMobileMenu(false)
                }
              >

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >

                  Bookmarks

                </Button>

              </Link>

              <Button
                variant="destructive"
                onClick={logout}
                className="w-full"
              >

                Logout

              </Button>

            </>

          ) : (

            <>

              <Link
                href="/login"
                onClick={() =>
                  setMobileMenu(false)
                }
              >

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >

                  Login

                </Button>

              </Link>

              <Link
                href="/signup"
                onClick={() =>
                  setMobileMenu(false)
                }
              >

                <Button className="w-full">

                  Sign Up

                </Button>

              </Link>

            </>

          )}

        </div>

      )}

    </nav>
  );
}