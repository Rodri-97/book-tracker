"use client";

import { Book } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function UserBookRating({ book }: { book: Book }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <p>My Rating:</p>
      <span className="flex flex-row justify-center items-center gap-1">
        <Rating startRating={book.rating || 0} googleId={book.googleId} />
      </span>
    </div>
  );
}

function Rating({
  startRating,
  googleId,
}: {
  startRating: number;
  googleId: string;
}) {
  const [currentRating, setCurrentRating] = useState(startRating);
  const [hoverRating, setHoverRating] = useState(0);

  const router = useRouter();

  const handleStarClick = async (starIdx: number) => {
    const newRating = starIdx + 1;

    try {
      await axios.patch(`/api/books/${googleId}`, { rating: newRating });
      router.refresh();
      toast({ title: "Rating updated successfully!" });
    } catch {
      return toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }

    return setCurrentRating(newRating);
  };

  const handleStarHover = (starIdx: number) => {
    setHoverRating(starIdx + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <span
          key={idx}
          onClick={() => handleStarClick(idx)}
          onMouseOver={() => handleStarHover(idx)}
          onMouseLeave={handleMouseLeave}
          className={`cursor-pointer text-2xl ${
            hoverRating > idx
              ? "text-blue-700"
              : currentRating > idx
              ? "text-gold"
              : "text-gray-300"
          }`}
        >
          &#9733; {/* Unicode character for a solid star */}
        </span>
      ))}
    </>
  );
}
