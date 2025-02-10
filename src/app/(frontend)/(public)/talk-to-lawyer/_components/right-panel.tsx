"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { format, getWeeksInMonth } from "date-fns";
import { Availability } from "@/payload-types";
import { SlotButton } from "./slot-button";
import { calculateAvailableTimeSlots } from "../_utils/available-slots";
import { cn } from "@/lib/utils";

export function RightPanel({
  selectedDate,
  daysOfWeek,
  duration = 30,
  className,
}: {
  daysOfWeek: Availability["daysOfWeek"];
  selectedDate: Date;
  duration?: number;
  className?: string;
}) {
  const weeksInMonth = getWeeksInMonth(selectedDate);

  const currentDay = daysOfWeek?.find(
    (day: any) =>
      day.day.toLowerCase() ===
      selectedDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase()
  );

  const slots = calculateAvailableTimeSlots(
    { fromTime: currentDay?.startTime, tillTime: currentDay?.endTime },
    [],
    format(selectedDate, "yyyy-MM-dd"),
    duration
  );

  return (
    <div className={cn("flex flex-col gap-4 w-[250px] p-6", className)}>
      <p className="text-base font-semibold">
        {format(selectedDate, "iiii")}{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
      <ScrollArea
        type="always"
        className="h-full"
        style={{
          maxHeight: weeksInMonth > 5 ? "380px" : "320px",
        }}
      >
        <div className="grid gap-2 pr-3">
          {slots?.map((slot, idx) => (
            <SlotButton selectedDate={selectedDate} key={idx} slot={slot} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
