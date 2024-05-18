"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBookshelves() {
  const [search, setSearch] = useState("");
  const path = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  function performSearch() {
    return router.push(
      `${path}?${status ? `status=${status}&` : ""}q=${search}&page=1`
    );
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Input
        className="bg-white w-full"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            return performSearch();
          }
        }}
      />
      <Button onClick={() => performSearch()}>Search</Button>
    </div>
  );
}
