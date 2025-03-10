import { OverallChart } from "@/components/chart/overall-chart";
import OverallStatisticCards from "@/components/chart/overall-statistic-cards";

export default async function Home() {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <OverallStatisticCards />
        <OverallChart />
      </div>
    </div>
  );
}
