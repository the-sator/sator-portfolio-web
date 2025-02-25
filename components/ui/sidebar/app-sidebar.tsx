import { Sidebar, SidebarFooter } from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";
import { getRoleById } from "@/data/role";
import { ADMIN_LOGIN_PATH } from "@/constant/base";

export async function AppSidebar() {
  const { data } = await getAdminSession();
  if (!data) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  const { data: role } = await getRoleById(data.role_id);
  return (
    <Sidebar>
      <SidebarItem role={role} />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown auth={data} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
