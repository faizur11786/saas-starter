// import { calendar_v3 } from "googleapis";
import {
  format,
  addMinutes,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";

export function calculateAvailableTimeSlots(
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  calenderEvents: any[],
  date: string,
  duration: number
): string[] {
  const now = new Date(); // Get the current time

  // Convert DB availability to Date objects
  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    now
  );
  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    "yyyy-MM-dd HH:mm",
    now
  );

  // Check if the availableFrom and availableTill dates are valid
  if (isNaN(availableFrom.getTime()) || isNaN(availableTill.getTime())) {
    return []; // Return an empty array if the dates are invalid
  }

  // Extract busy slots from Nylas data
  const busySlots = calenderEvents.map((slot: any) => ({
    start: fromUnixTime(slot.start?.date ? Number(slot.start.date) : 0),
    end: fromUnixTime(slot.end?.date ? Number(slot.end.date) : 0),
  }));

  // Generate all possible 30-minute slots within the available time
  const allSlots: Date[] = [];
  let currentSlot = availableFrom;
  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  // Filter out busy slots and slots before the current time
  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);
    return (
      isAfter(slot, now) && // Ensure the slot is after the current time
      !busySlots.some(
        (busy) =>
          // Check if the current slot overlaps with any of the busy slots
          (isAfter(slot, busy.start) && isBefore(slot, busy.end)) ||
          (isBefore(slotEnd, busy.start) && isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });

  // Format the free slots
  return freeSlots.map((slot) => format(slot, "HH:mm"));
}
