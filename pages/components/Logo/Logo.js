import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="text-center text-3xl">
      <Link href="/" className="flex justify-center text-center">
        <span className="mr-2 font-heading">CopyMatic</span>
      </Link>
    </div>
  );
}
