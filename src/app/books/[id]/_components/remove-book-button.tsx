"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RemoveBookButton({ googleId }: { googleId: string }) {
  const router = useRouter();

  async function handleClick() {
    try {
      await axios.delete(`/api/books/${googleId}`);
      router.refresh();
      return toast({ title: "Book removed successfully!" });
    } catch {
      return toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  }

  return (
    <Button variant="destructive" onClick={handleClick}>
      Remove Book
    </Button>
  );
}
