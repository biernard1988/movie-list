import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const imageURL = process.env.NEXT_PUBLIC_IMG;

export default function MovieCard({ movie, showLink = true }) {
  return (
    <div className="container p-10 sm:p-0">
      <div className="w-4/4">
        <div className="rounded-t-lg overflow-hidden my-2 mx-5 shadow-lg">
          <Image
            width={450}
            height={400}
            priority={true}
            className="object-cover"
            src={imageURL + movie.poster_path}
            alt={movie.title}
          />
        </div>
        <div className="bg-zinc-800 flex flex-col justify-center items-center rounded-b-xl p-3 space-y-3 mx-5 mb-3 shadow-lg">
          <h2 className="text-fit">{movie.title}</h2>
          <div className="flex items-center gap-2">
            <Star
              className="text-red-500 mb-0.5"
              width={16}
              height={16}
              alt="Star icon"
            />{" "}
            {movie.vote_average}
          </div>
          <div>
            {showLink && <Link href={`/movie/${movie.id}`}>Details</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}
