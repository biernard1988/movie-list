import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const imageURL = process.env.NEXT_PUBLIC_IMG;

export default function MovieCard({ movie, showLink = true }) {
  const getYear = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const shouldShowCard = movie.poster_path && movie.poster_path.length > 0;

  if (!shouldShowCard) {
    return null;
  }

  const formattedVoteAverage = parseFloat(movie.vote_average).toFixed(1);

  return (
    <div className="px-10 sm:px-0 my-5 sm:my-0">
      <div className="flex justify-center items-center rounded-t-lg overflow-hidden my-2 shadow-lg">
        <Image
          width={450}
          height={400}
          priority={true}
          className="object-cover"
          src={imageURL + movie.poster_path}
          alt={movie.title}
        />
      </div>
      <div className="bg-zinc-800 flex flex-col justify-center items-center rounded-b-xl p-3 space-y-3 shadow-lg overflow-hidden">
        <h2 className="text-center">
          {movie.title} ({getYear(movie.release_date)})
        </h2>
        <div className="flex items-center gap-2">
          <Star
            className="text-red-500 mb-0.5 hover:animate-spin"
            width={16}
            height={16}
            alt="Star icon"
          />
          {formattedVoteAverage}
        </div>
        <div className="hover:text-red-500 hover:font-bold transition duration-700">
          {showLink && <Link href={`/movie/${movie.id}`}>Details</Link>}
        </div>
      </div>
    </div>
  );
}
