"use client";
import MovieCard from "@/components/MovieCard";
import React, { useEffect, useState } from "react";

const useToken = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);

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
          "https://api.themoviedb.org/3/movie/popular?",
          options
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top rated movies");
        }

        const data = await response.json();
        setTopMovies(data.results);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {topMovies.length === 0 && <p>Loading...</p>}
      {topMovies.length > 0 &&
        topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
