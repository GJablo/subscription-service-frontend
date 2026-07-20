import { cn } from "@/lib/utils";

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-destructive focus:ring-destructive",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
