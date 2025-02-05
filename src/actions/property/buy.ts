"use server";

import { buyTokenSchema, BuyTokenSchema } from "@/schema/property";
import { getAuth } from "../auth/user";
import { Investment } from "@/payload-types";

export const buyPropertyToken = async (args: BuyTokenSchema) => {
  const { success, data } = buyTokenSchema.safeParse(args);

  if (!success) {
    throw new Error(
      "Please provide valid form data. Check all required fields."
    );
  }

  const auth = await getAuth();

  if (!auth?.user) {
    throw new Error("Authentication required. Please login to buy property.");
  }

  const { property, investment } = await Promise.all([
    auth.payload.findByID({
      collection: "properties",
      id: data.property,
    }),
    auth.payload.find({
      collection: "investments",
      where: {
        user: { equals: auth.user.id },
        property: { equals: data.property },
      },
    }),
  ])
    .then(([property, investment]) => ({
      property,
      investment,
    }))
    .catch((err) => {
      throw new Error("Failed to fetch property or investment.", err);
    });

  const amount = Number(data.amount);
  const quantity = Number(data.quantity);

  const transaction = await auth.payload.create({
    collection: "transactions",
    data: {
      amount,
      quantity,
      property: property.id,
      user: data.user,
    },
  });

  const availableSupply = Number(property.area) - Number(property.soldQuantity);

  if (Number(property.pricePerToken) * quantity !== amount) {
    throw new Error(
      "The total amount does not match the expected price per token. Please verify your input."
    );
  }

  if (availableSupply < quantity) {
    throw new Error("Not enough supply available.");
  }

  let doc: Investment;
  if (investment.docs.length) {
    const investedQuantity = Number(investment.docs[0].quantity);
    const investedAmount = Number(investment.docs[0].amount);
    const updateDoc = await auth.payload.update({
      collection: "investments",
      where: {
        user: { equals: auth.user.id },
        property: { equals: data.property },
      },
      data: {
        quantity: investedQuantity + quantity,
        amount: investedAmount + amount,
      },
    });
    doc = updateDoc.docs[0];
  } else {
    doc = await auth.payload.create({
      collection: "investments",
      data: {
        amount: Number(data.amount),
        quantity: Number(data.quantity),
        user: data.user,
        property: data.property,
      },
    });
  }

  auth.payload.update({
    collection: "properties",
    where: { id: { equals: property.id } },
    data: {
      soldQuantity: Number(property.soldQuantity) + quantity,
    },
  });
  auth.payload.update({
    collection: "transactions",
    where: { id: { equals: transaction.id } },
    data: { status: "completed", investment: doc.id },
  });

  return doc;
};
