"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useAuth } from "@/providers/auth-provider";
import { AuthService } from "@/services/auth";
import { createSupabaseFrontendClient } from "@/lib/supabase/client";

export function AvatarMenu() {
  const auth = useAuth();
  const authService = new AuthService(createSupabaseFrontendClient());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
        <Avatar className="size-12 overflow-hidden rounded-full">
          <AvatarImage src={auth.user?.user_metadata.avatar_url} />
          <AvatarFallback>{auth.user?.user_metadata.full_name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {auth.user?.user_metadata.full_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={authService.signOut}>Salir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
