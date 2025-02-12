"use client";

import { Calendar } from "@/components/calendar";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Availability } from "@/payload-types";

import { Fragment, useEffect, useState } from "react";
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { CheckoutForm } from "./_components/checkout-form";
import { useAuth } from "@/hooks/use-auth";
import { RightPanel } from "./_components/right-panel";
import { LeftPanel } from "./_components/left-panel";

type Props = {
  daysOfWeek: Availability["daysOfWeek"];
};

export const PageClient = ({ daysOfWeek }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data } = useAuth();

  const [date, setDate] = useState<CalendarDate | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("date");
    params.delete("slot");
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set("date", date.toString());
    url.searchParams.delete("slot");
    router.replace(url.toString());
  };

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    if (daysOfWeek?.length && daysOfWeek[adjustedIndex]) {
      return !daysOfWeek[adjustedIndex].isActive;
    }
    return true;
  };

  return (
    <div className="bg-card/50 rounded-lg border shadow-md flex w-fit min-h-fit">
      {searchParams.get("slot") ? (
        <Fragment>
          <LeftPanel
            title="Complete Your Booking"
            subtitle="Please fill in your details to confirm your consultation"
          />
          <CheckoutForm
            user={
              data?.user
                ? {
                    email: data.user.email,
                    mobile: data.user.mobile,
                    id: data.user.id,
                    name: `${data.user.name}`,
                  }
                : null
            }
          />
        </Fragment>
      ) : (
        <Fragment>
          <Calendar
            minValue={today(getLocalTimeZone())}
            defaultValue={today(getLocalTimeZone())}
            value={date}
            onChange={handleChangeDate}
            isDateUnavailable={isDateUnavailable}
          />

          {searchParams.get("date") && date && (
            <RightPanel
              className="border-l "
              daysOfWeek={daysOfWeek}
              selectedDate={date.toDate(getLocalTimeZone())}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};
