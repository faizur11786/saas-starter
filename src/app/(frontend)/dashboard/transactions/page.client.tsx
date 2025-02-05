"use client";
import { Investment } from "@/payload-types";
import React, { Fragment, useState } from "react";
import { InvestmentCard } from "./_components/investment-card";
import { TransactionsDialog } from "./_components/transactions-dialog";

type Props = {
  docs: Investment[];
};

const PageClient = ({ docs }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      {docs.map((doc) => (
        <InvestmentCard doc={doc} key={doc.id} setOpen={setOpen} />
      ))}
      <TransactionsDialog open={open} setOpen={setOpen} />
    </Fragment>
  );
};

export default PageClient;
