"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FilterButton({ text }: { text: string }) {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");
  const newStatus =
    text === "All" ? null : text.toLowerCase().split(" ").join("-");

  return (
    <Link href={`bookshelves${text === "All" ? "" : `?status=${newStatus}`}`}>
      <Button
        className={`bg-white text-blue-500 p-2 rounded-lg ${
          currentStatus === newStatus ? "border-blue-500" : "border-transparent"
        } border-2 border-solid hover:text-white`}
      >
        {text}
      </Button>
    </Link>
  );
}
