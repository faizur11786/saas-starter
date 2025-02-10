"use client";

import { Application, Payment } from "@/payload-types";
import { ColumnDef } from "@tanstack/react-table";

import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { currencyFormatter } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableRowAction } from "@/types";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { format } from "date-fns";

type GetColumnsProps = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Payment> | null>
  >;
};

export const getColumns = ({
  setRowAction,
}: GetColumnsProps): ColumnDef<Payment>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "application",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Application" />
      ),
      cell: ({ row }) => {
        const application = row.getValue("application") as Application;
        return application?.applicationId || "NA";
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        return currencyFormatter(amount / 100);
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        // const status = tasks.status.enumValues.find(
        //   (status) => status === row.original.status
        // );

        // if (!status) return null;

        // const Icon = getStatusIcon(status);

        return (
          <div className="flex w-[6.25rem] items-center">
            {/* <Icon
              className="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
            /> */}
            <span className="capitalize">{row.getValue("status")}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ cell }) => format(cell.getValue() as Date, "PPP"),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: function Cell({ row }) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <Ellipsis className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "update" })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, type: "delete" })}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
      enableHiding: false,
    },
  ];
};
