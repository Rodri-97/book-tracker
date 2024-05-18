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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "./ui/use-toast";

export default function DeleteReviewModal({ reviewId }: { reviewId: string }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    return setInput(event.target.value);
  }

  async function handleSubmit() {
    if (input.toLowerCase() !== "yes") return setOpen(false);

    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      router.refresh();
      toast({ title: "Review deleted successfully!" });
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
        <Button variant="destructive" className="w-6 h-6">
          X
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col justify-center items-center">
          <DialogTitle>
            Are you sure you want to delete this review?
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
            className="w-20 ml-auto mr-auto"
            onClick={handleSubmit}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
