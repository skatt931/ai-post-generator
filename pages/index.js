import { useUser } from "@auth0/nextjs-auth0/client";
import Logo from "@components/Logo";
import Link from "next/link";
import Typing from "@components/Typing";
import { Button, buttonVariants } from "@components/ui/button";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@components/ui/text-reveal-card";
import { TypewriterEffect } from "@components/ui/typewriter-effect";

export default function Home() {
  const words = [
    {
      text: "Build",
      className: "text-white dark:text-white",
    },
    {
      text: "your",
      className: "text-white dark:text-white",
    },
    {
      text: "blog",
      className: "text-white dark:text-white",
    },
    {
      text: "with",
      className: "text-white dark:text-white",
    },
    {
      text: "AI",
      className: "text-white dark:text-white",
    },
    {
      text: "powered",
      className: "text-white dark:text-white",
    },
    {
      text: "CopyMatic.",
      className: "text-purple-500 dark:text-purple-500",
    },
  ];

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-zinc-600">
      <div className="flex h-[40rem] flex-col items-center justify-center ">
        <p className="mb-10 text-base text-neutral-300 ">
          The road to freedom starts from here
        </p>
        <TypewriterEffect words={words} />
        <div className="mt-10 flex flex-col space-y-4 space-x-0 md:flex-row md:space-y-0 md:space-x-4">
          <button className="relative p-[3px] text-center" type="submit">
            <Link href="/posts/new">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="group relative  rounded-[6px] bg-primary px-8 py-2  text-primary-foreground  transition duration-200 hover:bg-transparent">
                Join now
              </div>
            </Link>
          </button>
          {/* <button className="relative w-40 p-[3px]" type="submit">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="group relative  rounded-[6px] bg-white px-8 py-2  text-black  transition duration-200 hover:bg-transparent">
              <Link href="/posts/new">Sign Up</Link>
            </div>
          </button> */}
        </div>
      </div>
    </div>
  );
}
