import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Logo from "../Logo";
import { Coins, File, FileInput } from "lucide-react";

export default function AppLayout({
  children,
  availableTokens,
  posts,
  postId,
}) {
  const { user } = useUser();
  return (
    <div className="grid h-screen max-h-screen grid-cols-[300px_1fr]">
      <div className=" flex h-screen max-h-screen flex-col overflow-hidden text-white ">
        {/* Header */}
        <div className="flex flex-col gap-6 bg-gray-800 px-2 py-5">
          <Logo />
          <button className="relative p-[3px]">
            <Link href="/posts/new">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="group relative  rounded-[6px] bg-white px-8  py-2 text-black transition duration-200 hover:bg-transparent">
                <FileInput className="mr-2 inline" size={16} />
                New Post
              </div>
            </Link>
          </button>
          <Link
            href="/token-topup"
            className="block text-center hover:text-gray-300 hover:underline"
          >
            <Coins className="mr-2 inline text-yellow-500" />
            <span>{availableTokens} tokens available</span>
          </Link>
        </div>
        {/* Posts */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-800 to-zinc-700 p-2">
          <div>Generated blogs:</div>
          <div className=" mt-2 grid gap-2">
            {posts.map((post) => (
              <>
                <Link
                  key={post._id}
                  href={`/posts/${post._id}`}
                  className={`has-tooltip  h-12 cursor-pointer truncate rounded-sm border border-red-50 p-3 hover:rounded-md hover:bg-gray-600 ${post._id === postId ? "bg-gray-600" : ""}`}
                  type="button"
                >
                  <File className="mr-2 inline" size={16} />
                  {post.topic}
                  <span class="tooltip left-[300px] -mt-2 rounded-md bg-slate-700 p-2 text-xs">
                    {post.topic}
                  </span>
                </Link>
              </>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-t-gray-300/70 bg-zinc-700 px-2 py-6">
          {!!user ? (
            <div className="flex">
              <div className="basis-1/4">
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="ml-4 basis-3/4">
                <p className="font-bold">{user.name}</p>
                <Link className="text-sm" href="/api/auth/logout">
                  Logout
                </Link>
              </div>
              <div className="basis-1/3" />
            </div>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      <main className="overflow-scroll bg-gradient-to-b from-zinc-200 to-zinc-100">
        {children}
      </main>
    </div>
  );
}
