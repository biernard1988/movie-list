import { Clapperboard, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between container m-5">
      <Link href={"/"}>
        <div className="flex items-center gap-2 text-blue-500 hover:text-blue-300 text-3xl font-semibold transition-all">
          <Clapperboard className="h-8 w-8" alt="Clapperboard icon" /> Movies
          List
        </div>
      </Link>

      <form className="flex gap-3" action="">
        <input
          className="text-black p-2 rounded-lg"
          type="text"
          placeholder="Search a movie"
        />
        <button type="submit">
          <Search className="h-4 w-4" alt="Search icon" />
        </button>
      </form>
    </nav>
  );
}
