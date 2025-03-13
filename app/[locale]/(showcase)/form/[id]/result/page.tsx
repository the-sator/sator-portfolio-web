import PriceCounter from "@/components/price-counter/price-counter";
import { LinkButton } from "@/components/ui/button/link-button";
import { getAttemptById } from "@/data/portfolio-form";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;
  const { data } = await getAttemptById(id);
  if (!data) notFound();
  return (
    <div className="flex min-h-[calc(100svh-56px)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <p>The Quota Price is:</p>
          <PriceCounter price={data.quoted_price} />
        </div>
        <div className="flex w-fit flex-col gap-2">
          <LinkButton href="/user-panel/chat" className="px-12">
            Make it happen
          </LinkButton>
          <LinkButton href="/form" variant={"secondary"}>
            Try again
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
