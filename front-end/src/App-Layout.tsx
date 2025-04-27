import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/App-Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { Toaster } from "./components/ui/sonner";


export default function Layout() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-right" />
        <SidebarProvider>

          <AppSidebar />

          <div className=" w-full">

            <Header />

            <main className="px-5 xl:px-10 py-6">
              <Outlet />
            </main>

          </div>

        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
