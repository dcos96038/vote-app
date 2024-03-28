"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/services/auth/client";
import { IconBrandGoogle } from "@tabler/icons-react";

export const LoginButton = () => {
  return (
    <Button className="w-full" onClick={signInWithGoogle}>
      <IconBrandGoogle className="mr-2" stroke={2} /> Login with Google
    </Button>
  );
};
