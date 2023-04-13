import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { Outlet } from "react-router-dom";

const supabase = createClient(
  "https://skktkvqhktbourpsrgch.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNra3RrdnFoa3Rib3VycHNyZ2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MDkyNzEsImV4cCI6MTk5Njk4NTI3MX0.JqbSOzgCZr-3coiY3g4EdRFfadEzNH5Szn08dOCPnfs"
);

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "example@email.com",
    password: "example-password",
  });
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
}

export const Layout = () => {
  const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // if (!session) {
  //   return <Auth supabaseClient={supabase} />;
  // }

  return <Outlet />;
};
