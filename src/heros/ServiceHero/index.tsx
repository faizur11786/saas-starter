import React from "react";

import type { Service } from "@/payload-types";

import { Media } from "@/components/media";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

export const ServiceHero: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { heroImage, title, metadata } = service;
  const { image } = metadata || {};

  const rating = Math.random() * 5;

  return (
    <div className="relative -mt-[10.4rem] flex items-end ">
      <div className="container py-8 z-10 relative grid grid-cols-3 gap-2 text-white pb-8">
        <div className="col-span-3 lg:col-span-2 flex flex-col sm:flex-row gap-4 pt-[4rem] justify-center">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full sm:rounded-lg shadow-md over overflow-hidden flex-0">
            {!image && (
              <div className="w-full h-full bg-primary flex items-center justify-center text-4xl font-semibold">
                {getInitials(title)}
              </div>
            )}
            {image && typeof image !== "string" && <Media resource={image} />}
          </div>
          <div>
            <h1 className="mb-3 text-xl md:text-2xl">{title}</h1>
            <div className="flex gap-x-4 gap-y-2 items-center mb-3 flex-wrap">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((value) => {
                  const isHalf =
                    rating % 1 !== 0 && value === Math.ceil(rating);
                  return (
                    <div key={value} className="relative inline-block">
                      <Star
                        className={cn("w-4", {
                          "fill-yellow-400 text-yellow-400":
                            value <= Math.floor(rating),
                          "fill-none text-muted-foreground": value > rating,
                        })}
                      />
                      {isHalf && (
                        <Star
                          className="w-4 absolute top-0 left-0 text-yellow-400 fill-yellow-400"
                          style={{ clipPath: "inset(0 50% 0 0)" }}
                        />
                      )}
                    </div>
                  );
                })}
                <span className="ml-2 text-xs text-muted-foreground">
                  {rating > 0 ? `${rating.toFixed(1)} out of 5` : "No rating"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[40vh] select-none">
        {heroImage && typeof heroImage !== "string" && (
          <Media
            fill
            priority
            imgClassName="-z-10 object-cover"
            resource={heroImage}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};
