"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateReviewRequest,
  createReviewSchema,
} from "@/schemas/reviews.schema";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function CreateReviewModal({
  bookGoogleId,
}: {
  bookGoogleId: string;
}) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    return setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-24 p-2 bg-green-600 hover:bg-green-700">
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col justify-center items-center">
          <DialogTitle>New Review</DialogTitle>
        </DialogHeader>
        <AddReviewForm bookGoogleId={bookGoogleId} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}

function AddReviewForm({
  bookGoogleId,
  closeModal,
}: {
  bookGoogleId: string;
  closeModal: () => void;
}) {
  const form = useForm<CreateReviewRequest>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      googleId: bookGoogleId,
      content: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: CreateReviewRequest) {
    try {
      await axios.post("/api/reviews", values);
      router.refresh();
      toast({ title: "Review created successfully!" });
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }

    return closeModal();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea className="h-56" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="ml-auto mr-auto p-4 bg-green-600 hover:bg-green-700"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Form>
  );
}
