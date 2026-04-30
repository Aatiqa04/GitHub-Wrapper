import { cn } from "@/lib/utils";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg";
}

export function Avatar({ className, size = "md", ...props }: AvatarProps) {
  return (
    <img
      className={cn(
        "rounded-full border-2 border-gh-border",
        size === "sm" && "h-8 w-8",
        size === "md" && "h-12 w-12",
        size === "lg" && "h-20 w-20",
        className
      )}
      {...props}
    />
  );
}
