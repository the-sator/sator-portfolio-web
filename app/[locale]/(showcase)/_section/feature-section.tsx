import { Button } from "@/components/ui/button";
import React from "react";

export default function FeatureSection() {
  return (
    <section className="flex min-h-svh gap-4 overflow-x-auto p-10">
      <div className="flex min-h-[calc(100svh-100px)] w-full items-end rounded-xl border p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Answer Question</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            dolorem iusto illum tempora, voluptatem esse, sit unde perferendis
            repellendus, atque nam odio voluptas dolor earum! Unde quibusdam
            recusandae magnam harum.
          </p>
          <Button className="w-fit px-12">Start Now</Button>
        </div>
      </div>

      <div className="flex min-h-[calc(100svh-100px)] w-full items-end rounded-xl border p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">Answer Question</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            dolorem iusto illum tempora, voluptatem esse, sit unde perferendis
            repellendus, atque nam odio voluptas dolor earum! Unde quibusdam
            recusandae magnam harum.
          </p>
          <Button className="w-fit px-12">Start Now</Button>
        </div>
      </div>
    </section>
  );
}
