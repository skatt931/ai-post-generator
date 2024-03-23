import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import HeroImage from "../public/bg-img.jpg";
import Logo from "./components/Logo";
import Link from "next/link";
import Typing from "./components/Typing";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative bg-gradient-to-b from-cyan-600 to-red-300">
      {/* <Image src={HeroImage} alt="Hero" fill className="absolute" /> */}
      <div className="flex flex-col gap-5 relative z-10 bg-gradient-to-b from-cyan-800/70 to-zinc-500/70 text-white text-center py-10 px-5 max-w-2xl rounded-xl backdrop-blur-sm">
        <Logo />
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            Ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            corrupti, quas voluptates, voluptatum, quidem voluptatem quos
          </p>
          <Typing />
          <Link href="/posts/new" className="btn">
            Begin
          </Link>
        </div>
      </div>
    </div>
  );
}
