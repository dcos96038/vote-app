"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { IconBrandGoogle } from "@tabler/icons-react";

export const LoginButton = () => {
  const auth = useAuth();

  return (
    <Button className="w-full" onClick={auth.loginWithGoogle}>
      <IconBrandGoogle className="mr-2" stroke={2} /> Login with Google
    </Button>
  );
};
