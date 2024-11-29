import PortfolioForm from "@/components/ui/form/portfolio-form";
import { getAllRoles } from "@/data/role";

export default async function App() {
  const result = await getAllRoles();
  console.log("result:", result);
  return (
    <div className="p-4">
      <PortfolioForm />
    </div>
  );
}
