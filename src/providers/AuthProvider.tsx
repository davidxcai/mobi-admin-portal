// src/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../hooks/supabaseClient";
import { useLogout } from "../hooks/useAuth";

const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 1000 * 60 * 5, // session stays fresh for 5 minutes
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Supabase auth event:", event);
        queryClient.setQueryData(["session"], session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [queryClient]);

  return {
    session,
    user: session?.user ?? null,
    isLoading,
    error,
  };
};
