import { Clapperboard, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mx-12 my-5">
      <Link href={"/"}>
        <div className="flex items-center gap-2 text-blue-500 hover:text-blue-300 text-3xl font-semibold transition duration-500">
          <Clapperboard className="h-8 w-8" alt="Clapperboard icon" /> Movies
          List
        </div>
      </Link>

      <form className="flex gap-3">
        <input
          className="text-black p-2 rounded-lg outline-none"
          type="text"
          placeholder="Search a movie"
        />
        <button
          className="border border-border rounded-md p-1 hover:text-black hover:bg-slate-100 transition duration-500"
          type="submit"
        >
          <Search className="h-6 w-6" alt="Search icon" />
        </button>
      </form>
    </nav>
  );
}
