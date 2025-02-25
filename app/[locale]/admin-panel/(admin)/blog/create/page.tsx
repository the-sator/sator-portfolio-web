import BlogForm from "@/components/ui/form/blog-form";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getAdminSession } from "@/data/admin";
import { getAllCategories } from "@/data/category";
import { redirect } from "next/navigation";

export default async function App() {
  const [{ data }, { data: categories }] = await Promise.all([
    getAdminSession(),
    getAllCategories(),
  ]);
  if (!data) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  return (
    <div className="p-4">
      <BlogForm admin={data} categories={categories || []} />
    </div>
  );
}
