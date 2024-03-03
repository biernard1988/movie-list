"use client";
import { Clapperboard, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate.push(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav className="flex flex-col gap-5 justify-center items-center sm:flex-row sm:justify-between mx-12 my-5 sm:my-10">
      <Link href={"/"}>
        <div className="flex items-center gap-2 text-3xl font-semibold">
          <h1>
            <span className="hover:text-red-600 transition duration-500">
              Kino
            </span>
            Flix
          </h1>
          <Clapperboard
            className="h-8 w-8 hover:text-red-600 transition duration-500"
            alt="Clapperboard icon"
          />
        </div>
      </Link>

      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          className="text-black p-2 rounded-lg outline-none"
          type="text"
          placeholder="Search a movie"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
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
