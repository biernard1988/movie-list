import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const imageURL = process.env.NEXT_PUBLIC_IMG;

export default function MovieCard({ movie, showLink = true }) {
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden m-5">
      <Image
        width={400}
        height={400}
        src={imageURL + movie.poster_path}
        alt={movie.title}
      />
      <div className="space-y-3 m-3">
        <h2>{movie.title}</h2>
        <div className="flex items-center gap-2">
          <Star width={20} height={20} alt="Star icon" /> {movie.vote_average}
        </div>
        <div>
          {showLink && <Link href={`/movie/${movie.id}`}>Details</Link>}
        </div>
      </div>
    </div>
  );
}
