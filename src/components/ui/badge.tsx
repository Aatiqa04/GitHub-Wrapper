import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "earned" | "locked";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-all duration-300",
        variant === "earned" &&
          "bg-gh-green/10 text-gh-green border border-gh-green/30",
        variant === "locked" &&
          "bg-gh-card text-gh-muted border border-gh-border opacity-50",
        variant === "default" &&
          "bg-gh-card text-gh-text border border-gh-border",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
