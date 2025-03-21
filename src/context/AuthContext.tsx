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
    displayName?: string,
  ): Promise<AuthResponseCustom> {
    let registerData =
      displayName === ""
        ? {
            email: email,
            password: password,
          }
        : {
            email: email,
            password: password,
            options: {
              data: {
                display_name: displayName,
              },
            },
          };
    const { data, error } = await supabase.auth.signUp(registerData);

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

  // Validate email
  function validateEmail(str: string) {
    if (!str) return false;
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(str);
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
        validateEmail,
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
