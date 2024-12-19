import { Sidebar, SidebarFooter } from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";

export async function AppSidebar() {
  const { session, auth } = await getAdminSession();
  if (!session || !auth) {
    return redirect("/admin-panel/login");
  }
  return (
    <Sidebar>
      <SidebarItem admin={auth} />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown session={session} admin={auth} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
