import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { postReq } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
export function AppSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // console.log("User logged out");
    const res = await postReq("/auth/logout");
    // console.log(res)
    if (res?.data) {
      navigate("/");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (!token) {
      navigate("/");
    }
  }, []);

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
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
