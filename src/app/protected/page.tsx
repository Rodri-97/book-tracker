import { validateRequest } from "@/lib/utils.server";
import { redirect } from "next/navigation";

export default async function Protected() {
  const { session } = await validateRequest();

  if (!session) return redirect("/login");

  return <div>Protected Page</div>;
}
