import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";
import { checkRole, getRoleById } from "@/data/role";
import { getAllResources } from "@/data/resource";

export async function AppSidebar() {
  const { session, admin } = await getAdminSession();
  if (!session || !admin) {
    return redirect("/admin/login");
  }
  return (
    <Sidebar>
      <SidebarHeader>{/* <Avatar></Avatar> */}</SidebarHeader>
      <SidebarItem admin={admin} />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown session={session} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
