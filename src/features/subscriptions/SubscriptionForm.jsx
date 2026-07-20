import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscriptionSchema } from "./schemas";
import { CATEGORIES, CURRENCIES, FREQUENCIES, PAYMENT_METHODS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";

function toInputDate(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function SubscriptionForm({ defaultValues, onSubmit, isSubmitting, submitLabel = "Save" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          startDate: toInputDate(defaultValues.startDate),
          renewalDate: toInputDate(defaultValues.renewalDate),
        }
      : {
          currency: "USD",
          frequency: "monthly",
          category: "other",
          paymentMethod: "credit_card",
        },
  });

  const submit = (values) => {
    const payload = { ...values };
    if (!payload.renewalDate) delete payload.renewalDate;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Netflix" error={!!errors.name} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" step="0.01" error={!!errors.price} {...register("price")} />
          {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price.message}</p>}
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select id="currency" {...register("currency")}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Select id="frequency" {...register("frequency")}>
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select id="category" {...register("category")}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="paymentMethod">Payment method</Label>
        <Select id="paymentMethod" {...register("paymentMethod")}>
          {PAYMENT_METHODS.map((p) => (
            <option key={p} value={p}>
              {p.replace("_", " ")}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start date</Label>
          <Input id="startDate" type="date" error={!!errors.startDate} {...register("startDate")} />
          {errors.startDate && <p className="mt-1 text-xs text-destructive">{errors.startDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="renewalDate">Renewal date (optional)</Label>
          <Input id="renewalDate" type="date" {...register("renewalDate")} />
        </div>
      </div>

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}
