import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Typing() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Create your own blog",
        1500, // wait 1s before replacing "Mice" with "Hamsters"
        "Create your own story",
        1500,
        "Create your own tale",
        1500,
        "Create your future",
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: "2em", display: "inline-block" }}
      repeat={Infinity}
    />
  );
}
