import { Media } from "@/components/media";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SectionBadge from "@/components/ui/section-badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrencySuffixes } from "@/lib/utils";
import { Investment } from "@/payload-types";
import {
  ArrowRightLeft,
  ChartCandlestick,
  Coins,
  EllipsisVertical,
  HandCoins,
  MapPin,
  Send,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  doc: Investment;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const InvestmentCard = ({ doc, setOpen }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (typeof doc.property === "string") {
    return <div>Something went wrong</div>;
  }

  const { quantity, amount, status, property, createdAt, id, user } = doc;
  const { area, title, media, price, currency, location, pricePerToken, roi } =
    property || {};
  const image = media?.length ? media[0] : "";

  return (
    <div key={doc.id} className="p-3 bg-muted/50 rounded-md">
      <div className="flex gap-2 justify-start items-center">
        <div className="rounded-md overflow-hidden">
          {!media && <div>No image</div>}
          {media && typeof media !== "string" && (
            <Media resource={image} className="w-[100px]" />
          )}
        </div>
        <div className="space-y-3">
          <div className="flex flex-col justify-start items-start">
            <h3 className="line-clamp-1">{title}</h3>
            <div className="text-muted-foreground flex gap-1 items-center">
              <MapPin className="w-3.5 h-3.5" />
              <p>{location}</p>
            </div>
            <SectionBadge title={`ROI ${(Number(roi) / 100)?.toFixed(2)} %`} />
          </div>
        </div>
      </div>
      <Separator className="!my-2" />
      <div className="flex gap-1 justify-between">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
            <Coins className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Balance</p>
            <p>{`${Number(doc.quantity).toLocaleString()}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
            <HandCoins className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Invested amount</p>
            <p>
              {formatCurrencySuffixes(Number(amount), {
                currency: currency ?? "AED",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
            <ChartCandlestick className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p>
              {formatCurrencySuffixes(quantity * Number(pricePerToken), {
                currency: currency ?? "AED",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisVertical />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-lg">
              <DropdownMenuItem
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("investmentId", id);
                  router.replace(`/dashboard/investments?${params.toString()}`);

                  setOpen(true);
                }}
              >
                <ArrowRightLeft className="text-muted-foreground" />
                <span>Transactions</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Coins className="text-muted-foreground" />
                <span>Buy More</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <Send className="text-muted-foreground" />
                <span>
                  Sell <span className="text-xs">(coming soon)</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
