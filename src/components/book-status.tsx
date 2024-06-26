"use client";

import { useState } from "react";
import { Book } from "@prisma/client";
import axios from "axios";
import { toast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

export default function BookStatus({ book }: { book: Book }) {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<string>(book.status);

  async function handleSubmit(newStatus: string) {
    try {
      await axios.patch(`/api/books/${book.googleId}`, { status: newStatus });
      router.refresh();
      return toast({ title: "Book edited successfully!" });
    } catch {
      return toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <p>Reading Status:</p>
      <Select
        value={selectedOption}
        onValueChange={async (value) => {
          setSelectedOption(value);
          await handleSubmit(value);
        }}
      >
        <SelectTrigger className="w-[250px] text-foreground bg-blue-50 border-blue-500 border-solid border-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="TO_READ">To Read</SelectItem>
            <SelectItem value="CURRENTLY_READING">Currently Reading</SelectItem>
            <SelectItem value="DID_NOT_FINISH">Did Not Finish</SelectItem>
            <SelectItem value="READ">Read</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
