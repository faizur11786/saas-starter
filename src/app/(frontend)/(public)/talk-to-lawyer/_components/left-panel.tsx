import { useLocale } from "@react-aria/i18n";
import { ArrowLeft, CalendarIcon, Clock4 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LeftPanel({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const slotParam = searchParams.get("slot");
  const paymentStatus = searchParams.get("paymentStatus");

  return (
    <div
      className={cn(
        "flex flex-col gap-4 w-[430px] p-6 border-r justify-between",
        {
          hidden: paymentStatus === "success",
        }
      )}
    >
      <div className="grid gap-3">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <div className="flex ">
          <CalendarIcon className="size-4 mr-2" />
          <div className="flex flex-col text-sm font-semibold">
            <p>
              {new Date(slotParam as string).toLocaleString(locale, {
                dateStyle: "full",
              })}
            </p>
            <p>
              {new Date(slotParam as string).toLocaleString(locale, {
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Clock4 className="size-4 mr-2" />
          <p className="text-sm font-semibold">30 mins</p>
        </div>
      </div>
      <div>
        <Button variant={"outline"} className="gap-1" asChild>
          <Link href="/talk-to-lawyer">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
