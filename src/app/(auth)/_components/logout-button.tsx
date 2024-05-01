"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleClick() {
    try {
      await axios.post("/api/auth/logout");
      toast({ title: "Successfully logged out!" });
      return router.refresh();
    } catch {
      return toast({
        variant: "destructive",
        title: "Something went wrong.",
      });
    }
  }

  return (
    <Button variant="destructive" onClick={handleClick}>
      Logout
    </Button>
  );
}
