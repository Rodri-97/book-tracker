"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export default function AddBookButton({ googleId }: { googleId: string }) {
  async function handleClick() {
    try {
      await axios.post("/api/books", { googleId });
      return toast({ title: "Book added successfully!" });
    } catch {
      return toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  }

  return (
    <Button type="submit" onClick={handleClick}>
      Add Book
    </Button>
  );
}
