import Link from "next/link";
import { cn } from "@/src/lib/utils";

type ButtonLinkProps = Readonly<{
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  className?: string;
}>;

export const ButtonLink = ({ children, href, icon, className }: ButtonLinkProps) => (
  <Link
    href={href}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90",
      className
    )}
  >
    {children}
    {icon}
  </Link>
);
