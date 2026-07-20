import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Pencil, Trash2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useSubscription,
  useUpdateSubscription,
  useDeleteSubscription,
  useCancelSubscription,
} from "@/features/subscriptions/hooks";
import { SubscriptionForm } from "@/features/subscriptions/SubscriptionForm";
import { useToast } from "@/context/ToastContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Spinner } from "@/components/ui/Spinner";

export default function SubscriptionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: subscription, isLoading } = useSubscription(id);
  const updateMutation = useUpdateSubscription();
  const deleteMutation = useDeleteSubscription();
  const cancelMutation = useCancelSubscription();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!subscription) return null;

  const handleUpdate = async (payload) => {
    try {
      await updateMutation.mutateAsync({ id, payload });
      toast({ title: "Subscription updated", variant: "success" });
      setIsEditOpen(false);
    } catch (error) {
      toast({ title: "Failed to update", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "Subscription deleted", variant: "success" });
      navigate("/dashboard");
    } catch (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    }
  };

  const handleCancel = async () => {
    try {
      await cancelMutation.mutateAsync(id);
      toast({ title: "Subscription canceled", variant: "success" });
    } catch (error) {
      toast({ title: "Failed to cancel", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <Card>
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-2xl">{subscription.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground capitalize">{subscription.category}</p>
          </div>
          <Badge variant={subscription.status}>{subscription.status}</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Field label="Price" value={`${subscription.price} ${subscription.currency}`} />
            <Field label="Frequency" value={subscription.frequency} capitalize />
            <Field label="Payment method" value={subscription.paymentMethod?.replace("_", " ")} capitalize />
            <Field label="Start date" value={format(new Date(subscription.startDate), "MMM d, yyyy")} />
            {subscription.renewalDate && (
              <Field label="Renewal date" value={format(new Date(subscription.renewalDate), "MMM d, yyyy")} />
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            {subscription.status !== "canceled" && (
              <Button variant="outline" size="sm" onClick={handleCancel} isLoading={cancelMutation.isPending}>
                <XCircle className="h-4 w-4" />
                Cancel subscription
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit subscription">
        <SubscriptionForm
          defaultValues={subscription}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
          submitLabel="Save changes"
        />
      </Dialog>

      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete subscription"
        description="This action cannot be undone."
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} isLoading={deleteMutation.isPending}>
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

function Field({ label, value, capitalize }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className={capitalize ? "capitalize" : ""}>{value}</p>
    </div>
  );
}
