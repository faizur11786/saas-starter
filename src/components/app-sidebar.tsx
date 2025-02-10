"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  PieChart,
  Settings2,
  SquareTerminal,
  ArrowRightLeft,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Nav } from "./nav";
import { User } from "@/payload-types";
import { Logo } from "./logo";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Workflows",
      url: "/workflows",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  dashboard: [
    {
      name: "Applications",
      url: "/dashboard/applications",
      icon: PieChart,
    },
    {
      name: "Payments",
      url: "/dashboard/payments",
      icon: ArrowRightLeft,
    },
  ],
};

type Props = React.ComponentProps<typeof Sidebar> & {
  user?: Pick<User, "name" | "email">;
};

export function AppSidebar({ user, ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex justify-center items-center">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <Nav navItems={data.dashboard} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: user?.name || "",
            email: user?.email || "",
            name: user?.name || "",
          }}
        />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
