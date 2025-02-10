import type { Metadata } from "next";

// import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";

import PageClient from "./page.client";
import { Purchase } from "./_components/purchase";
import { notFound } from "next/navigation";
import RichText from "@/components/custom/rich-text";
import { generateMeta } from "@/lib/payload/generateMeta";
import { ServiceHero } from "@/heros/ServiceHero";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });

  const services = await payload.find({
    collection: "services",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = services.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Service({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = "" } = await paramsPromise;
  const url = "/services/" + slug;
  const service = await queryServiceBySlug({ slug });

  if (!service) return notFound();

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}

      {/* {draft && <LivePreviewListener />} */}

      <ServiceHero service={service} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <div className="grid grid-cols-3 gap-5 items-start">
            <div className="col-span-2 divide-y-[1px]">
              <div className="py-6">
                <RichText
                  className="mx-auto"
                  data={service.content}
                  enableGutter={false}
                />
              </div>
            </div>
            <div className="z-[11] px-6 py-7 -mt-44 sticky top-[40px] rounded-xl backdrop-blur-md bg-card shadow-md space-y-3">
              <Purchase
                id={service.id}
                metadata={service.metadata}
                price={service.price}
                title={service.title}
              />
            </div>
          </div>

          {/* {lawyer.relatedPosts && lawyer.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={lawyer.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )} */}
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;
  const service = await queryServiceBySlug({ slug });

  return generateMeta({ doc: service });
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "services",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
