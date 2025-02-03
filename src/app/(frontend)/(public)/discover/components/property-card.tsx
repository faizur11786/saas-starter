"use client";
import { Media } from "@/components/media";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Property } from "@/payload-types";
import { CircleDollarSign, Combine, Mountain } from "lucide-react";
import React, { Fragment, useState } from "react";

type Props = {
  doc: Pick<
    Property,
    | "pricePerToken"
    | "metadata"
    | "media"
    | "price"
    | "area"
    | "publishedAt"
    | "location"
    | "id"
    | "description"
    | "title"
  >;
};

export const PropertyCard = ({
  doc: {
    media,
    metadata,
    title,
    description,
    price,
    area,
    publishedAt,
    pricePerToken,
  },
}: Props) => {
  const image = media[0];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        {!media && <div>No image</div>}
        {media && typeof media !== "string" && <Media resource={image} />}
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-lg line-clamp-1 mb-1">{title || "NA"}</p>
        <div className="grid grid-cols-2 gap-1">
          <div className="flex items-center gap-2">
            <Combine className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Fraction</p>
              <p className="text-pretty text-primary font-semibold">
                {`${area} ft2`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircleDollarSign className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Per Token</p>
              <p className="text-pretty text-primary font-semibold">$1000</p>
            </div>
          </div>
        </div>
        <div>
          <h4>Price</h4>
          <p>$1000</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const Properties = ({ docs }: { docs: Props["doc"][] }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <div className="grid grid-cols-4 gap-4">
        {docs.map((doc) => (
          <PropertyCard key={doc.id} doc={doc} />
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
              ad?
            </p>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
