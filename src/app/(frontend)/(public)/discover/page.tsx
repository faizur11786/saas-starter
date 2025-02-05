import { getPayload } from "@/lib/getPayload";
import { Properties } from "./_components/property-card";
import { Blinds } from "lucide-react";

export default async function Discover() {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: "properties",
    depth: 1,
    limit: 12,
    select: {
      metadata: true,
      price: true,
      area: true,
      publishedAt: true,
      media: true,
      location: true,
      title: true,
      description: true,
      pricePerToken: true,
      currency: true,
      soldQuantity: true,
      roi: true,
    },
    where: {
      _status: { equals: "published" },
    },
  });

  return (
    <section className="container space-y-8 pt-28">
      <div>
        <div className="flex gap-2">
          <div className="w-[4rem] h-[4rem] bg-primary/15 rounded-md flex justify-center items-center">
            <Blinds className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl">Discover</h1>
            <p className="text-muted-foreground">
              Explore investment opportunities in these properties.
            </p>
          </div>
        </div>
        {/* To Do: Add search bar here */}
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-xl">Active Properties</h3>
          <p className="text-sm text-muted-foreground">
            Brief property description
          </p>
        </div>
        <div>{docs.length && <Properties docs={docs} />}</div>
      </div>
    </section>
  );
}
