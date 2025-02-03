import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import supabase from "@/supabase-client";
import { defaultContext, SupabaseContext } from "@/types/auth.types";
import { AuthResponseCustom } from "@/types/auth.types";
import { Session, User } from "@supabase/supabase-js";

const AuthContext = createContext<SupabaseContext>(defaultContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Sign up
  async function signUpNewUser(
    email: string,
    password: string,
  ): Promise<AuthResponseCustom> {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error on sign-up: ", error);
      return { success: false, data: { user: null, session: null }, error };
    }
    return { success: true, data, error: null };
  }

  // Sign in
  async function signInUser(
    email: string,
    password: string,
  ): Promise<AuthResponseCustom> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error on sign-in: ", error);
      return { success: false, data: { user: null, session: null }, error };
    }
    return { success: true, data, error: null };
  }

  // Sign in with Google
  async function signInUserGoogle(): Promise<AuthResponseCustom> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // redirectTo: `${import.meta.env.VITE_APP_URL as string}/dashboard`,
        redirectTo: "http://localhost:5173/dashboard/home",
      },
    });

    if (error) {
      console.error("Error on sign-in: ", error);
      return { success: false, data: { user: null, session: null }, error };
    }
    return { success: true, data, error: null };
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        // if (_event === "SIGNED_IN") {
        //   window.location.href = "/dashboard";
        // }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Sign out
  async function signOut(): Promise<AuthResponseCustom> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error on sign-out: ", error);
      return { success: false, data: { user: null, session: null }, error };
    }
    return { success: true, data: { user: null, session: null }, error: null };
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signUpNewUser,
        signInUser,
        signInUserGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }

  return context;
};
