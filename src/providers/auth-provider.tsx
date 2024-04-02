"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import { createSupabaseFrontendClient } from "@/lib/supabase/client";

interface AuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
}

interface AuthContext {
  user: User | null;
}

const AuthContext = createContext<AuthContext>({
  user: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ accessToken, children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const supabase = createSupabaseFrontendClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
      setUser(session?.user ?? null);
    });

    return () => {
      listener.unsubscribe();
    };
  }, [accessToken, router, supabase]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
