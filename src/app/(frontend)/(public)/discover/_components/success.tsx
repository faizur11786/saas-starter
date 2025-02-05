import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";

const Success = () => {
  return (
    <Fragment>
      <DialogHeader>
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
      </DialogHeader>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Purchase Successful!</h2>
        <p className="text-muted-foreground w-[90%] mx-auto">
          Your property token purchase has been completed successfully. You can
          view your investment details in your portfolio.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/dashboard/investments">View Portfolio</Link>
        </Button>
        <DialogClose>Browse More</DialogClose>
      </div>
    </Fragment>
  );
};

export default Success;
