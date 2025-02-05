"use client";
import { Media } from "@/components/media";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { formatCurrencySuffixes } from "@/lib/utils";
import { Property } from "@/payload-types";
import {
  CircleDollarSign,
  Coins,
  Combine,
  MapPin,
  Percent,
} from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import BuyForm from "./buy-form";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import Success from "./success";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentDoc: React.Dispatch<React.SetStateAction<Props["doc"] | null>>;
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
    | "currency"
    | "soldQuantity"
    | "roi"
  >;
};

export const PropertyCard = (props: Props) => {
  const {
    setOpen,
    setCurrentDoc,
    doc: {
      id,
      media,
      metadata,
      title,
      description,
      price,
      area,
      soldQuantity,
      publishedAt,
      pricePerToken,
      currency,
      location,
      roi,
    },
  } = props;
  const image = media[0];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md ">
      <CardHeader className="p-0">
        {!media && <div>No image</div>}
        {media && typeof media !== "string" && <Media resource={image} />}
      </CardHeader>
      <CardContent className="p-2 space-y-1">
        <div className="flex gap-1 items-center">
          <p className="text-xl text-primary font-semibold">
            {formatCurrencySuffixes(Number(pricePerToken), {
              currency: currency ?? "AED",
            })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{`/ Per Token`}</p>
        </div>
        <div>
          <p className="text-lg line-clamp-1">{title || "NA"}</p>
          <div className="text-muted-foreground flex gap-1 items-center">
            <MapPin className="w-3.5 h-3.5" />
            <p>{location}</p>
          </div>
        </div>
        <Separator className="!my-2" />
        <div className="grid grid-cols-2 gap-1">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
              <Coins className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Token Supply</p>
              <p className="text-primary font-semibold">
                {`${Number(area).toLocaleString()}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
              <Percent className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ROI</p>
              <p className="text-primary font-semibold">
                {`${(Number(roi) / 100).toFixed(2)}%`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
              <CircleDollarSign className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Property value</p>
              <p className="text-primary font-semibold">
                {formatCurrencySuffixes(Number(price), {
                  currency: currency ?? "AED",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
              <Combine className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Token Price</p>
              <p className="text-primary font-semibold">
                {formatCurrencySuffixes(Number(pricePerToken), {
                  currency: currency ?? "AED",
                })}
              </p>
            </div>
          </div>
        </div>
        <Separator className="!my-2" />
        <p className="text-sm text-muted-foreground">
          {`${((Number(soldQuantity) / Number(area)) * 100).toFixed(2)}% of tokens sold`}
        </p>
        <Button
          className="w-full"
          onClick={() => {
            setOpen(true);
            setCurrentDoc(props.doc);
          }}
        >
          Invest Now
        </Button>
      </CardContent>
    </Card>
  );
};

export const Properties = ({ docs }: { docs: Props["doc"][] }) => {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<Props["doc"] | null>(null);

  useEffect(() => {
    if (!open) {
      setIsSuccess(false);
      setCurrentDoc(null);
    }
  }, [open]);

  return (
    <Fragment>
      <div className="grid grid-cols-4 gap-4">
        {docs.map((doc) => (
          <PropertyCard
            key={doc.id}
            doc={doc}
            setOpen={setOpen}
            setCurrentDoc={setCurrentDoc}
          />
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <FlickeringGrid
            className="absolute inset-0 -z-10 h-full w-full"
            squareSize={4}
            gridGap={6}
            color="#e6ba0a"
            maxOpacity={0.2}
            flickerChance={0.1}
            height={100}
          />
          {isSuccess ? (
            <Success />
          ) : (
            <Fragment>
              <DialogHeader>
                <DialogTitle>{currentDoc?.title}</DialogTitle>
                <div className="flex gap-1 items-center text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <p>{currentDoc?.location}</p>
                </div>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
                      <Combine className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Available Supply
                      </p>
                      <p className="text-pretty text-primary font-semibold">
                        {(
                          Number(currentDoc?.area) -
                          Number(currentDoc?.soldQuantity)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center w-10 h-10 bg-primary/15 rounded-md">
                      <Coins className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Token Price
                      </p>
                      <p className="text-pretty text-primary font-semibold">
                        {formatCurrencySuffixes(
                          Number(currentDoc?.pricePerToken),
                          {
                            currency: currentDoc?.currency ?? "AED",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <BuyForm
                  pricePerToken={currentDoc?.pricePerToken}
                  currency={currentDoc?.currency}
                  area={currentDoc?.area as number}
                  id={currentDoc?.id as string}
                  setIsSuccess={setIsSuccess}
                />
              </div>
            </Fragment>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
