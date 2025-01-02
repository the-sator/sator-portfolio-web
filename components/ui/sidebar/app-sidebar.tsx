import { Sidebar, SidebarFooter } from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";
import { getRoleById } from "@/data/role";

export async function AppSidebar() {
  const { session, auth } = await getAdminSession();
  if (!session || !auth) {
    return redirect("/admin-panel/login");
  }
  const { data: role } = await getRoleById(auth.role.id);
  return (
    <Sidebar>
      <SidebarItem role={role} />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown session={session} admin={auth} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
