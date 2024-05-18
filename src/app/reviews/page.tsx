import { validateRequest } from "@/lib/utils.server";
import { redirect } from "next/navigation";

export default async function Reviews() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  return <div>Reviews</div>;
}
