import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <nav>
        <h2>
          <Link href={"/"}> Movies List </Link>
        </h2>
      </nav>
      <h1>Home Page</h1>
    </>
  );
}
