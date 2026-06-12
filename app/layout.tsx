import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recruitment Portal",
  description: "Candidate registration and HR review portal."
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      {children}
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
