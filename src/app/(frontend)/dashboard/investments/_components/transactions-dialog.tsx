import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { getClientSideURL } from "@/lib/getURL";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, Fragment, SetStateAction } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { stringify } from "qs-esm";
import type { PaginatedDocs, Where } from "payload";
import { Investment, Transaction } from "@/payload-types";
import { formatDistance, formatRelative, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatCurrencySuffixes } from "@/lib/utils";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

export const TransactionsDialog = ({ setOpen, open }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const investmentId = searchParams.get("investmentId");

  const { data, isLoading, error } = useQuery({
    queryKey: ["investment", investmentId],
    queryFn: async () => {
      if (!investmentId) {
        return null;
      }

      const query: Where = {
        investment: { equals: investmentId },
      };
      const stringifiedQuery = stringify(
        { where: query },
        { addQueryPrefix: true }
      );
      const res = await fetch(
        `${getClientSideURL()}/api/transactions${stringifiedQuery}`
      );
      return (await res.json()) as PaginatedDocs<Transaction>;
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!open) {
          params.delete("investmentId");
          router.replace(`/dashboard/investments?${params.toString()}`);
        }
        setOpen(open);
      }}
    >
      <DialogContent className="sm:max-w-[525px] ">
        <FlickeringGrid
          className="absolute inset-0 -z-10 h-full w-full"
          squareSize={4}
          gridGap={6}
          color="#e6ba0a"
          maxOpacity={0.2}
          flickerChance={0.1}
          height={115}
        />
        <DialogHeader>
          <DialogTitle>Transactions</DialogTitle>
          <DialogDescription>
            View all your investment transactions, including payments, refunds
            and current status
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Table>
            <TableCaption>{isLoading && "Loading..."}</TableCaption>
            {data && (
              <Fragment>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] p-2 h-auto">
                      Amount
                    </TableHead>
                    <TableHead className="p-2 h-auto">Quantity</TableHead>
                    <TableHead className="p-2 h-auto text-center">
                      Date
                    </TableHead>
                    <TableHead className="text-right p-2 h-auto">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.docs.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium p-2">
                        {formatCurrencySuffixes(item.amount, {
                          currency: "AED",
                        })}
                      </TableCell>
                      <TableCell className="p-2">{item.quantity}</TableCell>
                      <TableCell className="text-center p-2">
                        {formatDistance(new Date(item.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell className="text-right p-2">
                        <Badge className="text-xs">
                          {item.status?.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Fragment>
            )}
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
