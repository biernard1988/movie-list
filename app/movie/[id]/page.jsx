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

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="container mx-auto">
      {movie && (
        <div className="border border-black rounded-lg mx-40 my-10 w-50">
          <MovieCard movie={movie} showLink={false} />
          <p className="flex justify-center items-center text-lg mt-5">
            "{movie.tagline}"
          </p>
          <div className="space-y-5 p-5">
            <div className="flex gap-2">
              <h3 className="flex gap-2">
                <CircleDollarSign /> Budget:
              </h3>
              <p>{formatCurrency(movie.budget)}</p>
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
              <p>{formatCurrency(movie.revenue)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="flex gap-2 mb-5">
                <NotebookText /> Description:
              </h3>
              <p className="text-justify px-20">{movie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
