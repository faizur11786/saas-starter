import { CTA } from "@/blocks/cta";
import { HighImpactHero } from "@/heros/HighImpact";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <HighImpactHero />
      <CTA />
    </Fragment>
    // <div className="w-full relative flex flex-col">
    //   <section className="w-full">

    //   </section>

    //   {/* <section className="w-full">
    //     <Perks />
    //   </section>

    //   <section className="w-full">
    //     <HowItWorks />
    //   </section>

    //   <section className="w-full">
    //     <Features />
    //   </section>

    //   <section className="w-full">
    //     <Testimonials />
    //   </section>

    //   <section className="w-full">
    //     <Pricing />
    //   </section>

    //   <section className="w-full">
    //     <PlatformMetrics />
    //   </section>

    //   <section className="w-full">
    //     <FAQ />
    //   </section>

    //   <section className="w-full">
    //     <CTA />
    //   </section> */}
    // </div>
  );
}
