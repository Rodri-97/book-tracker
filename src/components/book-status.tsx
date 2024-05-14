"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "@prisma/client";
import { Button } from "./ui/button";
import { EditBookRequest, editBookSchema } from "@/schemas/books.schema";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { capitalize } from "@/lib/helpers";
import { useRouter } from "next/navigation";

export default function BookStatus({ book }: { book: Book }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {editMode ? (
        <EditBookStatusForm
          googleId={book.googleId}
          unsetEditMode={() => setEditMode(false)}
        />
      ) : (
        <>
          <p className="text-blue-700 font-medium">
            {capitalize(
              book.status
                .split("_")
                .map((w) => w.toLowerCase())
                .join(" ")
            )}
          </p>
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        </>
      )}
    </div>
  );
}

function EditBookStatusForm({
  googleId,
  unsetEditMode,
}: {
  googleId: string;
  unsetEditMode: () => void;
}) {
  const form = useForm<EditBookRequest>({
    resolver: zodResolver(editBookSchema),
  });

  const router = useRouter();

  async function onSubmit(values: EditBookRequest) {
    unsetEditMode();

    try {
      await axios.patch(`/api/books/${googleId}`, values);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Book Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TO_READ">To Read</SelectItem>
                  <SelectItem value="CURRENTLY_READING">
                    Currently Reading
                  </SelectItem>
                  <SelectItem value="DID_NOT_FINISH">Did Not Finish</SelectItem>
                  <SelectItem value="READ">Read</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
