"use server";

import { getPayload } from "@/lib/payload";
import { Application, Service } from "@/payload-types";
import {
  BookerCheckout,
  bookerCheckoutSchema,
  checkoutSchema,
  CheckoutSchema,
} from "@/schema/checkout";

type CheckoutType = Application["type"];

type CheckoutArgs = {
  type: CheckoutType;
  args: CheckoutSchema;
};

export const serviceCheckoutAction = async ({ args, type }: CheckoutArgs) => {
  const { success, data } = checkoutSchema.safeParse(args);

  if (!success) {
    throw new Error(
      "Please provide valid form data. Check all required fields."
    );
  }

  const payload = await getPayload();

  let service: Service | null = null;

  if (type === "service") {
    service = await payload.findByID({
      collection: "services",
      id: data.serviceId,
    });
  }

  const application = await payload.create({
    collection: "applications",
    data: {
      type,
      ...data,
      submitted: data,
      ...(type === "service"
        ? {
            service: data.serviceId,
          }
        : {}),
    },
  });

  if (!application) {
    throw new Error("Something went wrong");
  }

  // Create Payment intent
  const payment = await payload.create({
    collection: "payments",
    data: {
      application: application.id,
      ...data,
      ...(type === "service"
        ? {
            amount: Number(service?.price),
          }
        : {
            amount: Number("599"),
          }),
    },
  });

  return payment;
};

export const bookerCheckoutAction = async (args: BookerCheckout) => {
  const { success, data, error } = bookerCheckoutSchema.safeParse(args);
  console.log({ error: error?.issues });
  if (!success) {
    throw new Error(
      "Please provide valid form data. Check all required fields.",
      error
    );
  }

  const payload = await getPayload();

  const applicationDoc = await payload.create({
    collection: "applications",
    data: {
      type: "booking",
      user: data?.user || null,
      submitted: data,
    },
  });

  if (!applicationDoc) {
    throw new Error("Something went wrong");
  }

  // Create Payment intent
  const payment = await payload.create({
    collection: "payments",
    data: {
      amount: Number(Number(data.duration) * 19.966),
      application: applicationDoc.id,
      email: data.email,
      mobile: data.mobile,
      user: data.user || null,
    },
  });
  return payment;
};
