"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddBookButton({ googleId }: { googleId: string }) {
  const router = useRouter();

  async function handleClick() {
    try {
      await axios.post("/api/books", { googleId });
      router.refresh();
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
