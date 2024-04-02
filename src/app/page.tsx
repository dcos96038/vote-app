import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthService } from "@/services/auth";

import { LoginButton } from "../components/login-button";

export default async function Login() {
  const authService = new AuthService(createSupabaseServerClient());

  const user = await authService.getSupabaseUser();

  if (user) {
    redirect("/home");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg items-center justify-center">
      <div className="flex min-w-96 flex-col gap-10 rounded-md bg-slate-800 px-10 py-4">
        <h1 className="text-center text-xl font-medium">Login with socials</h1>
        <div>
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
