import { faBolt, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="text-center text-3xl">
      <Link href="/">
        <span className="mr-2 font-heading">CopyMatic</span>
        <FontAwesomeIcon
          icon={faMicrochip}
          className="max-w-xs text-cyan-300"
        />
      </Link>
    </div>
  );
}
