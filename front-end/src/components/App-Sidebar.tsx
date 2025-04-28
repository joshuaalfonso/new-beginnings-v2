import { LayoutGrid, ShoppingBasket   } from "lucide-react"

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
  useSidebar,
} from "../components/ui/sidebar"
import { NavLink } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Products",
    url: "products",
    icon: ShoppingBasket,
  },
  {
    title: "Categories",
    url: "categories",
    icon: ShoppingBasket,
  },
]

export function AppSidebar() {

    const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
        <SidebarHeader>
            <div className="flex justify-center font-semi-bold text-base">
                Logo
            </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <NavLink to={item.url} onClick={() => setOpenMobile(false)}>
                        {({isActive}) => (
                            <SidebarMenuButton asChild isActive={isActive}>
                                <span>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </span>
                            </SidebarMenuButton>
                        )}
                    </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
