import { cn } from "@/src/lib/utils";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

type BadgeProps = Readonly<{
  children: React.ReactNode;
  tone?: BadgeTone;
}>;

const toneClassName: Record<BadgeTone, string> = {
  neutral: "border-border bg-muted text-foreground",
  success: "border-green-200 bg-green-50 text-green-700",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
  danger: "border-red-200 bg-red-50 text-red-700"
};

export const Badge = ({ children, tone = "neutral" }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
      toneClassName[tone]
    )}
  >
    {children}
  </span>
);
