import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

interface dashboardLayoutProps {
    children: React.ReactNode;
}

const dashboardLayout = ({ children }: dashboardLayoutProps) => {
    return (
        <SidebarProvider>
            <TooltipProvider>
                <AppSidebar />
            </TooltipProvider>
            <SidebarInset className="bg-accent/20">
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default dashboardLayout
