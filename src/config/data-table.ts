import { Pickaxe, SquareSquare } from "lucide-react";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  featureFlags: [
    {
      label: "Advanced table",
      value: "advancedTable" as const,
      icon: Pickaxe,
      tooltipTitle: "Toggle advanced table",
      tooltipDescription: "A filter and sort builder to filter and sort rows.",
    },
    {
      label: "Floating bar",
      value: "floatingBar" as const,
      icon: SquareSquare,
      tooltipTitle: "Toggle floating bar",
      tooltipDescription: "A floating bar that sticks to the top of the table.",
    },
  ],
  textOperators: [
    { label: "Contains", value: "contains" as const },
    { label: "Does not contain", value: "not_contains" as const },
    { label: "Is", value: "equals" as const },
    { label: "Is not", value: "not_equals" as const },
    { label: "Is empty", value: "is_empty" as const },
    { label: "Is not empty", value: "not_empty" as const },
  ],
  numericOperators: [
    { label: "Is", value: "equals" as const },
    { label: "Is not", value: "not_equals" as const },
    { label: "Greater than", value: "greater_than" as const },
    { label: "Greater than or equal", value: "greater_than_equal" as const },
    { label: "Less than", value: "less_than" as const },
    { label: "Less than or equal", value: "less_than_equal" as const },
    { label: "Is empty", value: "is_empty" as const },
    { label: "Is not empty", value: "not_empty" as const },
  ],
  dateOperators: [
    { label: "Is", value: "equals" as const },
    { label: "Is not", value: "not_equals" as const },
    { label: "Before", value: "less_than" as const },
    { label: "After", value: "greater_than" as const },
    { label: "On or before", value: "less_than_equal" as const },
    { label: "On or after", value: "greater_than_equal" as const },
    { label: "Is empty", value: "is_empty" as const },
    { label: "Is not empty", value: "not_empty" as const },
  ],
  selectOperators: [
    { label: "Is", value: "equals" as const },
    { label: "Is not", value: "not_equals" as const },
    { label: "Is empty", value: "is_empty" as const },
    { label: "Is not empty", value: "not_empty" as const },
  ],
  booleanOperators: [
    { label: "Is", value: "equals" as const },
    { label: "Is not", value: "not_equals" as const },
  ],
  joinOperators: [
    { label: "And", value: "and" as const },
    { label: "Or", value: "or" as const },
  ],
  sortOrders: [
    { label: "Asc", value: "asc" as const },
    { label: "Desc", value: "desc" as const },
  ],
  columnTypes: [
    "text",
    "number",
    "date",
    "boolean",
    "select",
    "multi-select",
  ] as const,
  globalOperators: [
    "contains",
    "like",
    "exists",
    "in",
    "not_contains",
    "equals",
    "not_equals",
    "is_empty",
    "not_empty",
    "greater_than",
    "greater_than_equal",
    "less_than",
    "less_than_equal",
    "and",
    "or",
  ] as const,
};
