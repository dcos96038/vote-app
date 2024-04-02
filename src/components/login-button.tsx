"use client";

import { IconBrandGoogle } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { createSupabaseFrontendClient } from "@/lib/supabase/client";
import { AuthService } from "@/services/auth";

export const LoginButton = () => {
  const authService = new AuthService(createSupabaseFrontendClient());

  return (
    <Button className="w-full" onClick={authService.signInWithGoogle}>
      <IconBrandGoogle className="mr-2" stroke={2} /> Login with Google
    </Button>
  );
};
