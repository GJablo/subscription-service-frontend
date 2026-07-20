import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as subscriptionsApi from "@/api/subscriptions.api";
import { useAuth } from "@/context/AuthContext";

const KEY = "subscriptions";

export function useSubscriptions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: [KEY, "user", user?._id],
    queryFn: () => subscriptionsApi.getUserSubscriptions(user._id),
    enabled: !!user,
  });
}

export function useSubscription(id) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => subscriptionsApi.getSubscriptionById(id),
    enabled: !!id,
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscriptionsApi.createSubscription,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => subscriptionsApi.updateSubscription(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscriptionsApi.deleteSubscription,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: subscriptionsApi.cancelSubscription,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
  });
}
