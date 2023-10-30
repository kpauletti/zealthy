import { useAuth } from "../context/auth";
import { Redirect } from "expo-router";
import React from "react";

/**
 * Entry will just route to the correct page based on the auth status.
 */

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/dashboard/" />;
}
