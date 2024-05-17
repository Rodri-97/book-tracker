"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function FilterButton({ text }: { text: string }) {
  const path =
    text === "All"
      ? "/bookshelves"
      : `/bookshelves/${text.toLowerCase().split(" ").join("-")}`;
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <Link href={path}>
      <Button
        className={`bg-white text-blue-500 p-2 rounded-lg ${
          currentPath === path ? "border-blue-500" : "border-transparent"
        } border-2 border-solid hover:text-white`}
        onClick={() => {
          return router.refresh();
        }}
      >
        {text}
      </Button>
    </Link>
  );
}
