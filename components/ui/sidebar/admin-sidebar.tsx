import { Sidebar, SidebarFooter } from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";
import { getRoleById } from "@/data/role";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import AdminSidebarItem from "./admin-sidebar-item";

export async function AdminSidebar() {
  const { data } = await getAdminSession();
  if (!data) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  const { data: role } = await getRoleById(data.role_id);
  return (
    <Sidebar>
      <AdminSidebarItem role={role} />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown auth={data} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
