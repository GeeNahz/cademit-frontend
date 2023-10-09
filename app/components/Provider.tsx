"use client";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const Provider = ({
    children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>{ children }</SessionProvider>
  )
}

export default Provider;