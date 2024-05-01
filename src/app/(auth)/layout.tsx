import { validateRequest } from "@/lib/utils.server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await validateRequest();

  if (session) return redirect("/");

  return (
    <>
      <h1>Auth</h1>
      {children}
    </>
  );
}
