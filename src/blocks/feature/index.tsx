import React from "react";
import type { FeatureBlock as FeatureBlockProps } from "@/payload-types";

import { Badge } from "@/components/ui/badge";
import { Media } from "@/components/media";
import Image from "next/image";

export const FeatureBlock: React.FC<FeatureBlockProps> = (props) => {
  const { title, description, features, media } = props;
  return (
    <section className="">
      <div className="grid rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl lg:text-5xl tracking-tighter text-left font-regular">
                {title}
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                {description}
              </p>
            </div>
          </div>
          <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
            {features?.map((feature) => {
              return (
                <div
                  className="flex flex-row gap-6 items-start"
                  key={feature.id}
                >
                  <Image
                    className="mt-2"
                    src={feature.icon!}
                    alt={feature.title!}
                    width={20}
                    height={20}
                  />
                  <div className="flex flex-col gap-1">
                    <p>{feature.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="select-none w-full relative h-[400px] rounded-2xl overflow-hidden bg-muted aspect-square">
          {media && typeof media === "object" && (
            <Media
              fill
              imgClassName=" object-cover"
              priority
              resource={media}
            />
          )}
        </div>
      </div>
    </section>
  );
};
