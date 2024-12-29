import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold">LMS Dashboard</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <p className="py-2">Course List</p>
        </SidebarGroup>
        <SidebarGroup>
          <p className="py-2">Profile</p>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
