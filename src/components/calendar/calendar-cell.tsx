import { cn } from "@/lib/utils";
import {
  type CalendarDate,
  getLocalTimeZone,
  isSameMonth,
  isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";

export function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate,
    isUnavailable,
  } = useCalendarCell({ date }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  const isDateToday = isToday(date, getLocalTimeZone());

  const { focusProps, isFocusVisible } = useFocusRing();

  // Override isDisabled if the date is unavailable
  const finalIsDisabled = isDisabled || isUnavailable;

  return (
    <td
      {...cellProps}
      className={cn("py-1 relative px-1", isFocusVisible ? "z-10" : "z-0")}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="size-10 sm:size-12 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-[8px] flex items-center justify-center text-sm font-semibold transition-all",
            finalIsDisabled ? "text-muted-foreground cursor-not-allowed" : "",
            isFocusVisible ? "group-focus:z-2 ring-gray-12 ring-offset-1" : "",
            isSelected ? "bg-primary text-primary-foreground" : "",
            !isSelected && !finalIsDisabled
              ? "hover:bg-secondary/90 bg-secondary dark:text-white "
              : ""
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-white dark:bg-black"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
