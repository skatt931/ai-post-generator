import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Logo from "../Logo";

export default function AppLayout({ children }) {
  const { user } = useUser();
  return (
    <div className="grid h-screen max-h-screen grid-cols-[300px_1fr]">
      <div className="flex flex-col overflow-hidden text-white ">
        {/* Header */}
        <div className="flex flex-col gap-6 bg-cyan-800 px-2 py-5">
          <Logo />
          <Link className="btn" href="/posts/new">
            New Post
          </Link>
          <Link
            href="/token-topup"
            className="block text-center hover:text-gray-300 hover:underline"
          >
            <FontAwesomeIcon icon={faCoins} className="mr-2 text-yellow-500" />
            <span>0 tokens available</span>
          </Link>
        </div>
        {/* Posts */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-cyan-800 to-zinc-500 p-2">
          <div>Generated posts</div>
        </div>
        {/* Footer */}
        <div className="border-t border-t-gray-700/70 bg-zinc-500 px-2 py-6">
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
      <main className="bg-gradient-to-b from-purple-200 to-purple-100">
        {children}
      </main>
    </div>
  );
}
