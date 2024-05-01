import { validateRequest } from "@/lib/utils.server";
import AuthPage from "../_components/auth-page";
import { redirect } from "next/navigation";

export default async function Register() {
  const { session } = await validateRequest();

  if (session) return redirect("/");

  return (
    <>
      <AuthPage registerOrLogin="register" />
    </>
  );
}
