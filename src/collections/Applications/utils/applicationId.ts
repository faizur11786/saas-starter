import { generateRandomString } from "@/lib/utils";
import { format } from "date-fns";
import { DefaultValue } from "payload";

export const generateApplicationId: DefaultValue = () => {
  const date = new Date();
  const year = format(date, "yy");
  const today = format(date, "MMdd");
  const time = format(date, "HHmmss");
  const randomString = generateRandomString(4);
  const applicationId = `K4${year}${today}${time}${randomString}`;
  return applicationId;
};
