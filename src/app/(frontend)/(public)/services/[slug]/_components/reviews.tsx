import { CalendarDays, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  comment: string;
  date: string;
  avatar?: string;
  initial?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Charu",
    comment:
      "Very nice and confident advocate. Solved my case without much hussle.",
    date: "2 months ago",
    initial: "C",
  },
  {
    id: "2",
    name: "Satish",
    comment:
      "The opposite party got wht they deserved. Satisfied with the work that sir does. The opposite party got wht they deserved. Satisfied with the work that sir does.",
    date: "Over 3 months ago",
    initial: "S",
  },
  {
    id: "3",
    name: "Nikesh Kumar",
    comment:
      "Sir understood my entire case nd then we went ahead with the advice given by him and it worked out relly well for us.",
    date: "Over 3 months ago",
    initial: "N",
  },
];

export default function Reviews() {
  const rating = Math.random() * 5;
  return (
    <div className="py-6">
      <h2 className="text-3xl font-light mb-6">Popular Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <Card key={idx} className="pt-5 px-5 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  {review.avatar ? (
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={`${review.name}'s avatar`}
                      className="w-12 h-12 rounded-full bg-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium">
                      {review.initial}
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.name}</span>
                      <span className="text-sm text-green-600 font-light">
                        - Verified Client
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((value) => {
                        const isHalf =
                          rating % 1 !== 0 && value === Math.ceil(rating);
                        return (
                          <div key={value} className="relative inline-block">
                            <Star
                              className={cn("w-4", {
                                "fill-yellow-400 text-yellow-400":
                                  value <= Math.floor(rating),
                                "fill-none text-muted-foreground/50":
                                  value > rating,
                              })}
                            />
                            {isHalf && (
                              <Star
                                className="w-4 absolute top-0 left-0 text-yellow-400 fill-yellow-400 "
                                style={{ clipPath: "inset(0 50% 0 0)" }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="">
                  <p className="text-sm">{review.comment}</p>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 pb-2.5">
                  <CalendarDays className="w-4 h-5" />
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
