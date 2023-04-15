import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { authorize, setSession } from "../../redux/slices/app";

export const supabase = createClient(
  "https://skktkvqhktbourpsrgch.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNra3RrdnFoa3Rib3VycHNyZ2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MDkyNzEsImV4cCI6MTk5Njk4NTI3MX0.JqbSOzgCZr-3coiY3g4EdRFfadEzNH5Szn08dOCPnfs"
);

const useSession = () => {
  const dispatch = useAppDispatch();

  const getSession = async () => {
    try {
      const sessionResponse = await supabase.auth.getSession();
      const userResponse = await supabase.auth.getUser();

      if (sessionResponse.data.session && userResponse.data.user) {
        dispatch(
          authorize({
            session: sessionResponse.data.session,
            user: userResponse.data.user,
          })
        );
      }
    } catch (error) {
      //TODO: Request error
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    const auth = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });

    return () => auth.data.subscription.unsubscribe();
  });
};

export const Layout = () => {
  useSession();

  return <Outlet />;
};
