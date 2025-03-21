import { Sidebar, SidebarFooter } from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import AppSidebarItem from "./app-sidebar-item";
import { getUserSession } from "@/data/user";
import { redirect } from "next/navigation";
import { USER_LOGIN_PATH } from "@/constant/base";

export async function AppSidebar() {
  const { data } = await getUserSession();
  if (!data) {
    redirect(USER_LOGIN_PATH);
  }
  return (
    <Sidebar>
      <AppSidebarItem />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown auth={data} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
