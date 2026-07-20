import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="mt-2 text-muted-foreground">Page not found.</p>
      <Link to="/" className="mt-4 text-sm font-medium underline">
        Go home
      </Link>
    </div>
  );
}
