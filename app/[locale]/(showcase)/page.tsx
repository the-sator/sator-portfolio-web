import TrackCard from "./_component/track-card";
import FeatureSection from "./_section/feature-section";
import { LinkButton } from "@/components/ui/button/link-button";

export default function Home() {
  return (
    <div>
      <section className="flex min-h-[calc(100svh-56px)] items-center justify-center gap-10 px-52">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Welcome to Sator Portfolio</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            necessitatibus voluptatum modi earum exercitationem saepe?
          </p>
          <LinkButton href="/form" className="w-fit px-14">
            Start Now
          </LinkButton>
        </div>
        <TrackCard />
      </section>
      <FeatureSection />
    </div>
  );
}
