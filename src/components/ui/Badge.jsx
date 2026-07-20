import { cn } from "@/lib/utils";

const variants = {
  active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  expired: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  canceled: "bg-red-500/15 text-red-600 dark:text-red-400",
  default: "bg-secondary text-secondary-foreground",
};

export function Badge({ className, variant = "default", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        variants[variant] ?? variants.default,
        className,
      )}
    >
      {children}
    </span>
  );
}
