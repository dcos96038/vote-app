"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";

interface AuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
}

interface AuthContextProps {
  user: User | null;
  loginWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loginWithGoogle: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ accessToken, children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null); // [1
  const router = useRouter();

  const supabase = createClient();

  const loginWithGoogle = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/",
      },
    });
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("event", _event);

        if (
          session?.access_token !== accessToken &&
          !["SIGNED_IN", "INITIAL_SESSION"].includes(_event)
        ) {
          router.push("/login");
        }

        setUser(session?.user ?? null);

        setLoading(false);
      },
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [accessToken, router, supabase.auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
      }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
