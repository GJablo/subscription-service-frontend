import { useNavigate } from "react-router-dom";
import { useCreateSubscription } from "@/features/subscriptions/hooks";
import { SubscriptionForm } from "@/features/subscriptions/SubscriptionForm";
import { useToast } from "@/context/ToastContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export default function NewSubscriptionPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync, isPending } = useCreateSubscription();

  const onSubmit = async (payload) => {
    try {
      const result = await mutateAsync(payload);
      toast({ title: "Subscription created", variant: "success" });
      navigate(`/subscriptions/${result.subscription._id}`);
    } catch (error) {
      toast({ title: "Failed to create subscription", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>New subscription</CardTitle>
          <CardDescription>Add a subscription to start tracking it.</CardDescription>
        </CardHeader>
        <CardContent>
          <SubscriptionForm onSubmit={onSubmit} isSubmitting={isPending} submitLabel="Create subscription" />
        </CardContent>
      </Card>
    </div>
  );
}
