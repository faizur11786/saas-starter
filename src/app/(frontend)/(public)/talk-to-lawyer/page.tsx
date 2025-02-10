import { Availability } from "@/payload-types";
import React from "react";
import { PageClient } from "./page.client";
import { getCachedGlobal } from "@/lib/payload/getGlobals";

const Page = async () => {
  const availability: Availability = await getCachedGlobal("availability")();

  return (
    <div className="container py-20 flex justify-center">
      <PageClient daysOfWeek={availability.daysOfWeek} />
    </div>
  );
};

export default Page;
