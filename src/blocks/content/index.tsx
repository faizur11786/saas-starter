import React from "react";

import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { CMSLink } from "@/components/custom/cms-link";
import { cn } from "@/lib/utils";
import RichText from "@/components/custom/rich-text";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    full: "12",
    half: "6",
    oneThird: "4",
    twoThirds: "8",
  };

  return (
    <div className="container my-16">
      <div className={cn("grid grid-cols-4 lg:grid-cols-12")}>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, position = "left" } = col;

            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    "md:col-span-2": size !== "full",
                    "lg:!col-start-3 md:col-span-full": position === "center",
                  }
                )}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
