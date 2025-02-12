import Razorpay from "razorpay";

const { RAZORPAY_SECRET, RAZORPAY_KEY } = process.env;

export const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY!,
  key_secret: RAZORPAY_SECRET!,
});
