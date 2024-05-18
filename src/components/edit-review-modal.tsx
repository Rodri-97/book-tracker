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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditReviewRequest, editReviewSchema } from "@/schemas/reviews.schema";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function EditReviewModal({
  reviewId,
  initialContent,
}: {
  reviewId: string;
  initialContent: string;
}) {
  const form = useForm<EditReviewRequest>({
    resolver: zodResolver(editReviewSchema),
    defaultValues: {
      content: initialContent,
    },
  });

  const router = useRouter();

  async function onSubmit(values: EditReviewRequest) {
    try {
      await axios.patch(`/api/reviews/${reviewId}`, values);
      router.refresh();
      toast({ title: "Review updated successfully!" });
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }

    return setOpen(false);
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-20">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col justify-center items-center">
          <DialogTitle>Edit Review</DialogTitle>
        </DialogHeader>
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
            <Button className="w-20 ml-auto mr-auto" type="submit">
              Edit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
