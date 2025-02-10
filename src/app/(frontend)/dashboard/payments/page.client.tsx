"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Payment } from "@/payload-types";
import React, { Fragment } from "react";
import { getColumns } from "./_lib/columns";
import { DataTableFilterField, DataTableRowAction } from "@/types";
import { DataTableToolbar } from "@/components/data-table/toolbar";
import { TasksTableToolbarActions } from "./_components/table-toolbar-actions";

type Props = {
  docs: Payment[];
  pageCount: number;
};

const PageClient = ({ docs, pageCount }: Props) => {
  const [_, setRowAction] = React.useState<DataTableRowAction<Payment> | null>(
    null
  );

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<Payment>[] = [
    {
      id: "email",
      label: "Email",
      placeholder: "Filter Emails...",
    },
    {
      id: "status",
      label: "Status",
      options: [
        {
          label: "Completed",
          value: "completed",
        },
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Failed",
          value: "failed",
        },
      ],
    },
  ];

  const { table } = useDataTable({
    data: docs,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <Fragment>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      </DataTable>
    </Fragment>
  );
};

export default PageClient;
