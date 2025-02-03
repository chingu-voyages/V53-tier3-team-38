import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import supabase from "@/supabase-client";
import { Session } from "@supabase/supabase-js";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      let response = await supabase.auth.getSession();
      setSession(response.data.session);
      setIsLoading(false);
    };

    fetchSession();
  }, []);

  // temporary loading message while session data is retrieved
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if no user session is detected, redirect user back to login
  if (!session) {
    return <Navigate to="/login" />;
  }

  // otherwise continue to protected content
  return children;
};
