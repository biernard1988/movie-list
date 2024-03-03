"use client";
import MovieCard from "@/components/MovieCard";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const useToken = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Search() {
  const searchParams = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${useToken}`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?&query=${query}`,
          options
        );

        if (!response) {
          throw new Error("Failed to fetch top rated movies");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <h1 className="mt-5 text-xl">
        Results for: <span className="italic text-red-600">{query}</span>
      </h1>
      <div className="w-full container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.length === 0 && <p>Loading...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}
