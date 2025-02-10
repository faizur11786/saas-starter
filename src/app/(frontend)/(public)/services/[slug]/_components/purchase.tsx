import { Service } from "@/payload-types";
import { FC, Fragment } from "react";
import { CheckoutForm } from "./checkout-form";
import { getAuth } from "@/actions/auth/user";
import { currencyFormatter, getInitials } from "@/lib/utils";
import { Media } from "@/components/media";
import { RatingStar } from "@/components/custom/rating-star";

type Props = Pick<Service, "id" | "metadata" | "title" | "price">;

export const Purchase: FC<Props> = async ({ metadata, title, id, price }) => {
  const auth = await getAuth();

  const { image } = metadata || {};
  return (
    <Fragment>
      <div className="flex gap-2 items-center">
        <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full sm:rounded-lg shadow-md over overflow-hidden flex-0">
          {!image && (
            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-3xl font-semibold text-muted-foreground">
              {getInitials(title)}
            </div>
          )}
          {image && typeof image !== "string" && <Media resource={image} />}
        </div>
        <div>
          <h3 className="text-lg">{title}</h3>
          <RatingStar rating={4} showLabel={false} />
          <div className="flex items-end gap-2">
            <p className="text-2xl text-primary">{currencyFormatter(price)}</p>
            <p className="line-through text-muted-foreground">
              {currencyFormatter(price + 1000)}
            </p>
          </div>
        </div>
      </div>
      <CheckoutForm
        id={id}
        user={
          auth?.user
            ? {
                email: auth?.user?.email,
                mobile: auth?.user?.mobile,
                id: auth?.user?.id,
                name: `${auth?.user?.name}`,
              }
            : null
        }
      />
    </Fragment>
  );
};
