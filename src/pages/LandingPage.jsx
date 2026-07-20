import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Track every subscription in one place</h1>
      <p className="mt-4 text-muted-foreground">
        SubTrack helps you keep tabs on renewals, spending, and payment methods across all your subscriptions.
      </p>
      <div className="mt-8 flex gap-3">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/sign-up"
              className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Get started
            </Link>
            <Link
              to="/sign-in"
              className="inline-flex h-11 items-center rounded-md border border-border px-6 text-sm font-medium hover:bg-accent"
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
