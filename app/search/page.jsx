"use client";
import axios from "axios";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        if (!query) return;

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        };

        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          options
        );

        const data = response.data;
        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchSearchedMovies();
  }, [query]);

  const renderMovieGrid = useCallback(
    () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 container mx-auto mb-4">
        {movies.length === 0 && <Loading />}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    ),
    [movies]
  );

  return renderMovieGrid();
}
