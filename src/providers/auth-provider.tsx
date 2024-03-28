"use client";

import { createSupabaseFrontendClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";

interface AuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
}

const AuthContext = createContext({});

const AuthProvider = ({ accessToken, children }: AuthProviderProps) => {
  const supabase = createSupabaseFrontendClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
    return () => {
      listener.unsubscribe();
    };
  }, [accessToken, router, supabase]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
