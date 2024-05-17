"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const router = useRouter();

  function performSearch() {
    return router.push(
      `/search-results?title=${searchTitle}&author=${searchAuthor}&page=1`
    );
  }

  return (
    <div className="h-full flex flex-col justify-start items-center gap-4 p-6">
      <div>
        <Label htmlFor="search-title">Title</Label>
        <Input
          id="search-title"
          className="border-blue-500 border-solid border-[1px]"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return performSearch();
            }
          }}
        />
      </div>
      <div>
        <Label htmlFor="search-author">Author</Label>
        <Input
          id="search-author"
          className="border-blue-500 border-solid border-[1px]"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return performSearch();
            }
          }}
        />
      </div>
      <Button onClick={performSearch}>Search</Button>
    </div>
  );
}
