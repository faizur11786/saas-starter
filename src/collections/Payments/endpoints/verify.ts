import { PayloadHandler } from "payload";
import crypto from "crypto";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_SECRET as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export const verify: PayloadHandler = async (req) => {
  const { orderId, razorpayPaymentId, razorpaySignature } =
    // @ts-ignore
    await req.json();

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return Response.json(
      { message: "payment verification failed", success: false },
      { status: 400 }
    );
  }

  return Response.json(
    { message: "payment verified successfully", success: true },
    { status: 200 }
  );
};
