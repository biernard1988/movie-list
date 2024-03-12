"use client";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import React, { useCallback, useEffect, useState } from "react";

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

  const renderMovieGrid = useCallback(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 container mx-auto px-5 md:px-0 mb-4">
        {topMovies.length === 0 && <Loading />}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    );
  }, [topMovies]);

  return renderMovieGrid();
}
