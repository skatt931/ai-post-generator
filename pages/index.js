import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();

  console.log(user);
  return (
    <div>
      <h1>Home page</h1>
      <p>
        {!!user ? (
          <>
            <div>
              <Image
                src={user.picture}
                alt={user.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div>
              <p>Hi {user.name}!</p>
              <p>Email: {user.email}</p>
            </div>
            <Link href="/api/auth/logout">Logout</Link>
          </>
        ) : (
          <Link href="/api/auth/login">Login</Link>
        )}
      </p>
    </div>
  );
}
