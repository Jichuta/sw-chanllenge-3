"use client";

import { Toaster as SonnerToaster } from "sonner";

export const Toaster = () => (
  <SonnerToaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      className: "text-sm"
    }}
  />
);
