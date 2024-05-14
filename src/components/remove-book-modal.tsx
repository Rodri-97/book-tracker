"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function RemoveBookModal({ googleId }: { googleId: string }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    return setInput(event.target.value);
  }

  async function handleSubmit() {
    if (input.toLowerCase() !== "yes") return setOpen(false);

    try {
      await axios.delete(`/api/books/${googleId}`);
      router.refresh();
      toast({ title: "Book removed successfully!" });
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }

    return setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col justify-center items-center">
          <DialogTitle>
            Are you sure you want to remove this book from your bookshelves?
          </DialogTitle>
          <DialogDescription>(Yes/No)</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="name"
            className="col-span-3"
            value={input}
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            className="w-full"
            onClick={handleSubmit}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
