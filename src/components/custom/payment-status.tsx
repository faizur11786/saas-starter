import {
  AlertCircle,
  Banknote,
  CalendarDays,
  CheckCircle,
  DollarSign,
  Hash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Payment } from "@/payload-types";
import { format } from "date-fns";
import { currencyFormatter } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = Pick<
  Payment,
  "amount" | "email" | "orderId" | "updatedAt" | "status" | "id"
> & {
  title: string;
  description?: string;
  isSuccess: boolean;
};

export default function PaymentStatus({
  amount,
  updatedAt,
  title,
  description,
  id,
  isSuccess,
}: Props) {
  return (
    <Card
      className={cn("w-full", {
        "border-green-500/10": isSuccess,
        "border-red-500/10": !isSuccess,
      })}
    >
      <CardHeader
        className={cn("p-4", {
          "bg-green-500/10": isSuccess,
          "bg-red-500/10": !isSuccess,
        })}
      >
        <div className="flex items-center space-x-2">
          {isSuccess ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-500" />
          )}
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
        <CardDescription className="">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex justify-center items-center bg-muted/50">
              <Banknote className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-semibold">
              Amount: {currencyFormatter(Number(amount) / 100)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex justify-center items-center bg-muted/50">
              {isSuccess ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <span className="text-sm">
              Status: {isSuccess ? "Success" : "Failed"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex justify-center items-center bg-muted/50">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-sm">
              Date: {format(new Date(updatedAt), "PPpp")}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex justify-center items-center bg-muted/50">
              <Hash className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-sm">Order ID: {id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
