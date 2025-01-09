import PortfolioForm from "@/components/ui/form/portfolio-form";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getAdminSession } from "@/data/admin";
import { getAllCategories } from "@/data/category";
import { redirect } from "next/navigation";

export default async function App() {
  const [{ auth }, { data: categories }] = await Promise.all([
    getAdminSession(),
    getAllCategories(),
  ]);
  if (!auth) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  return (
    <div className="p-4">
      <PortfolioForm admin={auth} categories={categories || []} />
    </div>
  );
}
