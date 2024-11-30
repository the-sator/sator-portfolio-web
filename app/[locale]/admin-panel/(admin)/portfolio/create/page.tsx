import PortfolioForm from "@/components/ui/form/portfolio-form";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";

export default async function App() {
  const { admin } = await getAdminSession();
  if (!admin) {
    return redirect("/admin-panel/login");
  }
  return (
    <div className="p-4">
      <PortfolioForm admin={admin} />
    </div>
  );
}
