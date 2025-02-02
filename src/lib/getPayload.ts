import configPromise from "@payload-config";
import { getPayload as loadPayload } from "payload";

export const getPayload = async () => {
  const payload = await loadPayload({ config: configPromise });
  return payload;
};
