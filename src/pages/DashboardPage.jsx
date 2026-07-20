import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useSubscriptions } from "@/features/subscriptions/hooks";
import { SubscriptionCard } from "@/features/subscriptions/SubscriptionCard";
import { Spinner } from "@/components/ui/Spinner";

export default function DashboardPage() {
  const { data: subscriptions, isLoading, isError, error } = useSubscriptions();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your subscriptions</h1>
          <p className="text-sm text-muted-foreground">Track and manage what you're paying for.</p>
        </div>
        <Link
          to="/subscriptions/new"
          className="inline-flex h-10 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New subscription
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {isError && <p className="text-sm text-destructive">{error.message}</p>}

      {subscriptions && subscriptions.length === 0 && (
        <div className="rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">No subscriptions yet.</p>
          <Link to="/subscriptions/new" className="mt-2 inline-block text-sm font-medium underline">
            Add your first subscription
          </Link>
        </div>
      )}

      {subscriptions && subscriptions.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((sub) => (
            <SubscriptionCard key={sub._id} subscription={sub} />
          ))}
        </div>
      )}
    </div>
  );
}
