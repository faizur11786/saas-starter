import { CTA } from "@/blocks/cta";
import { HighImpactHero } from "@/heros/HighImpact";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default function Home() {
  redirect("/discover");
  return (
    <Fragment>
      <HighImpactHero />
      <CTA />
    </Fragment>
  );
}
