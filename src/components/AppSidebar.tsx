"use client";

// LIBRARIES
import { usePathname } from "next/navigation";
// COMPONENTS
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// ICONS
import { Bolt, Home, Trophy } from "lucide-react";
// CONFIG
import { FEATURED_LEAGUES } from "@/config/leagues";

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          disabled
          className="hover:bg-transparent active:bg-transparent"
        >
          <div>
            <Bolt />
            <span className="font-bold">Sports Dashboard App</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Featured Leagues</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {FEATURED_LEAGUES.map((league) => (
                <SidebarMenuItem key={league.idLeague}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/league/${league.idLeague}`}
                  >
                    <Link href={`/league/${league.idLeague}`}>
                      <Trophy />
                      <span>{league.strLeague}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
