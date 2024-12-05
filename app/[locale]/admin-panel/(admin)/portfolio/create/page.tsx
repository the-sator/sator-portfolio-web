import PortfolioForm from "@/components/ui/form/portfolio-form";
import { getAdminSession } from "@/data/admin";
import { getAllCategories } from "@/data/category";
import { redirect } from "next/navigation";

export default async function App() {
  const [{ admin }, { data: categories }] = await Promise.all([
    getAdminSession(),
    getAllCategories(),
  ]);
  if (!admin) {
    return redirect("/admin-panel/login");
  }
  return (
    <div className="p-4">
      <PortfolioForm admin={admin} categories={categories || []} />
    </div>
  );
}
