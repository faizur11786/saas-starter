"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Application } from "@/payload-types";
import React, { Fragment } from "react";
import { getColumns } from "./_lib/columns";
import { DataTableFilterField, DataTableRowAction } from "@/types";
import { DataTableToolbar } from "@/components/data-table/toolbar";

type Props = {
  docs: Application[];
  pageCount: number;
};

const PageClient = ({ docs, pageCount }: Props) => {
  const [_, setRowAction] =
    React.useState<DataTableRowAction<Application> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  const filterFields: DataTableFilterField<Application>[] = [
    {
      id: "applicationId",
      label: "Application Id",
      placeholder: "Filter applicationId...",
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
        <DataTableToolbar
          table={table}
          filterFields={filterFields}
        ></DataTableToolbar>
      </DataTable>
    </Fragment>
  );
};

export default PageClient;
