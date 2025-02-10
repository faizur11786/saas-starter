"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type Props = {
  slot: string;
  selectedDate: Date;
};

export const SlotButton = ({ slot, selectedDate }: Props) => {
  const router = useRouter();
  const handler = (time: string) => {
    const timeValue = time.split(":").join(" ");
    const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
    if (!match) {
      console.error("Invalid time format");
      return null;
    }

    const hours = Number.parseInt(match[1]);
    const minutes = Number.parseInt(match[2]);

    selectedDate.setHours(hours, minutes);
    const url = new URL(window.location.href);
    url.searchParams.set("slot", selectedDate.toISOString());
    router.replace(url.toString());
  };

  return (
    <Button
      variant="outline"
      className="w-full mb-2"
      onClick={() => handler(slot)}
    >
      {format(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          ...slot.split(":").map(Number)
        ),
        "h:mm a"
      )}
    </Button>
  );
};
