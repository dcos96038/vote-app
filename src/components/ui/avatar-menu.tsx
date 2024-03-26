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
import { signOut } from "@/services/auth.client";

export function AvatarMenu() {
  const auth = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
        <Avatar className="rounded-full overflow-hidden size-12">
          <AvatarImage src={auth.user?.user_metadata.avatar_url} />
          <AvatarFallback>{auth.user?.user_metadata.full_name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {auth.user?.user_metadata.full_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
