import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";

export async function AppSidebar() {
  const { session } = await getAdminSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <Sidebar>
      <SidebarHeader>{/* <Avatar></Avatar> */}</SidebarHeader>
      <SidebarItem />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown session={session} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
