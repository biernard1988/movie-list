"use client";
import MovieCard from "@/components/MovieCard";
import {
  CircleDollarSign,
  Clock,
  NotebookText,
  TrendingUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const useToken = process.env.NEXT_PUBLIC_API_TOKEN;

export default function Movies() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${useToken}`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }

        const data = await response.json();
        if (data) {
          setMovie(data);
        } else {
          setMovie([]);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    if (id) {
      getMovie();
    }
  }, [id]);

  return (
    <div>
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p>{movie.tagline}</p>
          <div className="flex gap-2">
            <h3 className="flex gap-2">
              <CircleDollarSign /> Budget:
            </h3>
            <p>{movie.budget}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="flex gap-2">
              <Clock /> Duration:
            </h3>
            <p>{movie.runtime} minutes</p>
          </div>
          <div className="flex gap-2">
            <h3 className="flex gap-2">
              <TrendingUp /> Revenue:
            </h3>
            <p>{movie.revenue}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="flex gap-2">
              <NotebookText /> Description:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
}
