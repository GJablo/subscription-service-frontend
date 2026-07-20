import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function SubscriptionCard({ subscription }) {
  return (
    <Link to={`/subscriptions/${subscription._id}`}>
      <Card className="h-full transition-colors hover:border-foreground/30">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>{subscription.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground capitalize">{subscription.category}</p>
          </div>
          <Badge variant={subscription.status}>{subscription.status}</Badge>
        </CardHeader>
        <CardContent className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold">
              {subscription.price} <span className="text-sm font-normal text-muted-foreground">{subscription.currency}</span>
            </p>
            <p className="text-sm text-muted-foreground capitalize">{subscription.frequency}</p>
          </div>
          {subscription.renewalDate && (
            <p className="text-xs text-muted-foreground">
              Renews {format(new Date(subscription.renewalDate), "MMM d, yyyy")}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
