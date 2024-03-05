"use client";
import {
  CalendarCheck,
  CircleDollarSign,
  Clock,
  NotebookText,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const imageURL = process.env.NEXT_PUBLIC_IMG;
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
          console.log(data);
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

  const getYear = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const renderMovieDetail = useCallback(() => {
    return (
      <article className="container mx-auto">
        {movie && (
          <section className="flex flex-col justify-center items-center m-10">
            <Image
              width={450}
              height={400}
              priority={true}
              className="rounded-lg"
              src={imageURL + movie.poster_path}
              alt={movie.title}
            />
            <p className="text-lg my-5">"{movie.tagline}"</p>
            <aside className="parent flex flex-col md:flex-row justify-center xl:justify-between items-center border-t p-5 xl:mx-60 gap-5 md:gap-32 lg:gap-52">
              <div className="left-side space-y-8 mb-6 md:mb-0">
                <div className="flex gap-2">
                  <h3 className="flex gap-2">
                    <CalendarCheck /> Year:
                  </h3>
                  <p>{getYear(movie.release_date)}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="flex gap-2">
                    <Clock /> Duration:
                  </h3>
                  <p>{movie.runtime} minutes</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="flex gap-2">
                    <CircleDollarSign /> Budget:
                  </h3>
                  <p>{formatCurrency(movie.budget)}</p>
                </div>
                <div className="flex gap-2">
                  <h3 className="flex gap-2">
                    <TrendingUp /> Revenue:
                  </h3>
                  <p>{formatCurrency(movie.revenue)}</p>
                </div>
              </div>
              <div className="right-side mb-8">
                <div className="">
                  {/*   <h3 className="flex gap-2 mb-5">
                    <NotebookText /> Description:
                  </h3> */}
                  <p className="text-pretty">{movie.overview}</p>
                </div>
              </div>
            </aside>
          </section>
        )}
      </article>
    );
  }, [movie]);

  return renderMovieDetail();
}
