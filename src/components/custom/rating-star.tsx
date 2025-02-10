import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { FC } from "react";

type Props = {
  rating: number;
  className?: string;
  showLabel?: boolean;
};

export const RatingStar: FC<Props> = ({
  rating,
  showLabel = true,
  className,
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((value) => {
        const isHalf = rating % 1 !== 0 && value === Math.ceil(rating);
        return (
          <div key={value} className="relative inline-block">
            <Star
              className={cn("w-4", {
                "fill-yellow-400 text-yellow-400": value <= Math.floor(rating),
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
      {showLabel && (
        <span className="ml-2 text-xs text-muted-foreground">
          {rating > 0 ? `${rating.toFixed(1)} out of 5` : "No rating"}
        </span>
      )}
    </div>
  );
};
