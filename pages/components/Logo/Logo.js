import { faBolt, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="text-3xl text-center">
      <Link href="/">
        <span className="mr-2 font-heading">CopyMatic</span>
        <FontAwesomeIcon
          icon={faMicrochip}
          className="text-cyan-300 max-w-xs"
        />
      </Link>
    </div>
  );
}
