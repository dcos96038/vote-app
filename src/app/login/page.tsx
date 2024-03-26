"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function Login() {
  const auth = useAuth();

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg items-center justify-center">
      <div className="flex min-w-96 flex-col gap-10 rounded-md bg-slate-800 px-10 py-4">
        <h1 className="text-center text-xl font-medium">Login with socials</h1>
        <div className="">
          <Button className="w-full" onClick={auth.loginWithGoogle}>
            <IconBrandGoogle className="mr-2" stroke={2} /> Login with Google
          </Button>
        </div>
      </div>
    </main>
  );
}
